import Button from '../Button';

type FooterProps = {
  setOpenModal?: (open: boolean) => void;
};

export const ModalFooter = ({ setOpenModal }: FooterProps) => (
  <div
    className="flex items-center justify-end gap-2
    border-t border-white/[0.08] px-5 py-4"
  >
    <Button
      label="Cancel"
      type="button"
      variant="secondary"
      onClick={() => setOpenModal?.(false)}
    />
    <Button label="Save" type="submit" variant="primary" />
  </div>
);
