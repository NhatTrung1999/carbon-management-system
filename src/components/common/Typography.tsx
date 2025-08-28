type Props = {
  name: string;
  className?: string;
};

const Typography = ({ name, className }: Props) => {
  return <div className={`${className}`}>{name}</div>;
};

export default Typography;
