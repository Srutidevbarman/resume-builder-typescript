import Button from "../ui/Button";

interface Props {
  loading: boolean;
  createResume: () => void;
}

export default function CreateResumeButton({ loading, createResume }: Props) {
  return (
    <Button loading={loading} onClick={createResume}>
      + New Resume
    </Button>
  );
}
