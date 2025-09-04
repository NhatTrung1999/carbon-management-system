import Button from '../../common/Button';
import Input from '../../common/Input';

const Search = () => {
  return (
    <div className="grid grid-cols-5 gap-5 mb-5">
      <div>
        <Input
          label="UserID"
          type="text"
          name="userid"
          customClassNameInput="outline-none"
        />
      </div>
      <div>
        <Input
          label="FullName"
          type="text"
          name="fullname"
          customClassNameInput="outline-none"
        />
      </div>
      <div className='self-end'>
        <Button
          label="Search"
          type="button"
          className="block text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Search;
