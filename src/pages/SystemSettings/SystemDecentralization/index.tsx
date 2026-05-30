import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck } from 'lucide-react';
import { BreadcrumbData } from '../../../types/breadcrumb';
import Breadcrumb from '../../../components/common/Breadcrumb';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getSearch } from '../../../features/userSlice';
import type { IUserManagement } from '../../../types/users';
import { BREADCRUMB, MENU_SIDEBAR } from '../../../utils/constanst';
import usersApi from '../../../api/users';
import { Toast } from '../../../utils/Toast';

type ModuleOption = {
  group: string;
  label: string;
  path: string;
};

const moduleOptions: ModuleOption[] = MENU_SIDEBAR.flatMap((group) =>
  group.sidebarItem.map((item) => ({
    group: group.name,
    label: item.text,
    path: item.path,
  }))
);

const allModulePaths = moduleOptions.map((item) => item.path);

const SystemDecentralization = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.user);
  const { user } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();

  const [keyword, setKeyword] = useState('');
  const [selectedUser, setSelectedUser] = useState<IUserManagement | null>(null);
  const [selectedPaths, setSelectedPaths] = useState<string[]>([]);
  const [configured, setConfigured] = useState(false);
  const [loadingPermission, setLoadingPermission] = useState(false);
  const [saving, setSaving] = useState(false);

  const filteredUsers = useMemo(() => {
    const value = keyword.toLowerCase().trim();
    if (!value) return users;
    return users.filter((item) =>
      [item.UserID, item.Name, item.Email, item.Role]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(value))
    );
  }, [keyword, users]);

  const selectedSet = useMemo(() => new Set(selectedPaths), [selectedPaths]);

  useEffect(() => {
    dispatch(
      getSearch({
        sortField: 'UserID',
        sortOrder: 'asc',
      })
    );
  }, [dispatch]);

  const loadPermissions = async (item: IUserManagement) => {
    setSelectedUser(item);
    setLoadingPermission(true);
    try {
      const res = await usersApi.getModulePermissions(item.UserID);
      setConfigured(res.permissionsConfigured);
      setSelectedPaths(res.modulePermissions);
    } catch {
      Toast.fire({ icon: 'error', title: 'Cannot load permissions' });
    } finally {
      setLoadingPermission(false);
    }
  };

  const togglePath = (path: string) => {
    setSelectedPaths((current) =>
      current.includes(path)
        ? current.filter((item) => item !== path)
        : [...current, path]
    );
  };

  const toggleGroup = (groupName: string) => {
    const groupPaths = moduleOptions
      .filter((item) => item.group === groupName)
      .map((item) => item.path);
    const allChecked = groupPaths.every((path) => selectedSet.has(path));

    setSelectedPaths((current) => {
      const next = new Set(current);
      groupPaths.forEach((path) => {
        if (allChecked) next.delete(path);
        else next.add(path);
      });
      return Array.from(next);
    });
  };

  const handleSelectAll = () => setSelectedPaths(allModulePaths);
  const handleClearAll = () => setSelectedPaths([]);

  const handleSave = async () => {
    if (!selectedUser) {
      Toast.fire({ icon: 'warning', title: 'Please choose user' });
      return;
    }

    setSaving(true);
    try {
      const res = await usersApi.updateModulePermissions(
        selectedUser.UserID,
        selectedPaths,
        allModulePaths,
        user?.UserID
      );
      setConfigured(res.permissionsConfigured);
      setSelectedPaths(res.modulePermissions);
      Toast.fire({ icon: 'success', title: 'Saved successfully!' });
    } catch {
      Toast.fire({ icon: 'error', title: 'Cannot save permissions' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-full min-w-0 flex-col gap-4 px-2 sm:px-4 xl:h-full xl:min-h-0">
      <div>
        <Breadcrumb
          items={BreadcrumbData(
            t(BREADCRUMB),
            t('system_decentral.system_decentralization')
          )}
        />
        <h1 className="text-2xl font-bold tracking-tight text-white/90 sm:text-3xl">
          {t('system_decentral.system_decentralization')}
        </h1>
      </div>

      <div
        className="relative grid min-w-0 gap-4 overflow-hidden rounded-2xl border border-white/[0.10]
        bg-white/[0.05] p-4 shadow-[0_8px_40px_rgba(0,0,0,0.30)] backdrop-blur-[32px]
        lg:grid-cols-[360px_minmax(0,1fr)] xl:min-h-0 xl:flex-1"
      >
        <div className="flex min-h-[360px] min-w-0 flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03]">
          <div className="shrink-0 border-b border-white/[0.08] p-4">
            <Input
              label="User"
              name="keyword"
              type="text"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Search user..."
            />
          </div>

          <div className="min-h-0 flex-1 overflow-auto p-2 [scrollbar-width:thin]">
            {filteredUsers.map((item) => {
              const active = selectedUser?.ID === item.ID;
              return (
                <button
                  key={item.ID}
                  type="button"
                  onClick={() => loadPermissions(item)}
                  className={`w-full rounded-lg px-3 py-3 text-left transition-colors
                    ${
                      active
                        ? 'bg-emerald-400/15 text-white ring-1 ring-emerald-400/25'
                        : 'text-white/75 hover:bg-white/[0.06] hover:text-white'
                    }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="truncate text-sm font-semibold">
                      {item.UserID}
                    </span>
                    <span className="shrink-0 rounded-full bg-white/[0.06] px-2 py-0.5 text-[11px]">
                      {item.Role}
                    </span>
                  </div>
                  <div className="mt-1 truncate text-xs text-white/45">
                    {item.Name || item.Email}
                  </div>
                </button>
              );
            })}

            {filteredUsers.length === 0 && (
              <div className="px-3 py-10 text-center text-sm text-white/35">
                No users found
              </div>
            )}
          </div>
        </div>

        <div className="flex min-h-[420px] min-w-0 flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03]">
          <div className="flex shrink-0 flex-col gap-3 border-b border-white/[0.08] p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-white">
                <ShieldCheck className="h-5 w-5 text-emerald-300" />
                <span className="font-semibold">
                  {selectedUser
                    ? `${selectedUser.UserID} - ${selectedUser.Name}`
                    : 'Choose a user'}
                </span>
              </div>
              <p className="mt-1 text-sm text-white/45">
                {selectedUser
                  ? configured
                    ? `${selectedPaths.length}/${allModulePaths.length} modules enabled`
                    : 'This user is using default role rules until you save.'
                  : 'Select a user to configure module visibility.'}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                label="Select all"
                type="button"
                variant="secondary"
                onClick={handleSelectAll}
                disabled={!selectedUser || loadingPermission || saving}
              />
              <Button
                label="Clear"
                type="button"
                variant="secondary"
                onClick={handleClearAll}
                disabled={!selectedUser || loadingPermission || saving}
              />
              <Button
                label={saving ? 'Saving...' : 'Save'}
                type="button"
                variant="primary"
                onClick={handleSave}
                disabled={!selectedUser || loadingPermission || saving}
              />
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-auto p-4 [scrollbar-width:thin]">
            {loadingPermission ? (
              <div className="py-14 text-center text-sm text-white/40">
                Loading permissions...
              </div>
            ) : (
              <div className="space-y-4">
                {MENU_SIDEBAR.map((group) => {
                  const groupPaths = group.sidebarItem.map((item) => item.path);
                  const checkedCount = groupPaths.filter((path) =>
                    selectedSet.has(path)
                  ).length;

                  return (
                    <section
                      key={group.name}
                      className="rounded-xl border border-white/[0.08] bg-white/[0.03]"
                    >
                      <button
                        type="button"
                        onClick={() => toggleGroup(group.name)}
                        disabled={!selectedUser}
                        className="flex w-full items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3 text-left"
                      >
                        <span className="font-semibold text-white">
                          {t(group.name)}
                        </span>
                        <span className="text-xs text-white/45">
                          {checkedCount}/{groupPaths.length}
                        </span>
                      </button>

                      <div className="grid grid-cols-1 gap-2 p-3 md:grid-cols-2 xl:grid-cols-3">
                        {group.sidebarItem.map((item) => (
                          <label
                            key={item.path}
                            className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-3 transition-colors
                              ${
                                selectedSet.has(item.path)
                                  ? 'border-emerald-400/30 bg-emerald-400/10 text-white'
                                  : 'border-white/[0.06] bg-white/[0.02] text-white/70 hover:bg-white/[0.05]'
                              }`}
                          >
                            <input
                              type="checkbox"
                              checked={selectedSet.has(item.path)}
                              onChange={() => togglePath(item.path)}
                              disabled={!selectedUser}
                              className="h-4 w-4 shrink-0 accent-emerald-400"
                            />
                            <span className="min-w-0 truncate text-sm font-medium">
                              {t(item.text)}
                            </span>
                          </label>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemDecentralization;
