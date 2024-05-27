import Image from "next/image";

export type QueryT = {
  query: string;
};

interface QueryProps {
  query: QueryT;
}

export default function Query({ query }: QueryProps) {
  return (
    <div className="flex flex-row gap-5 items-start">
      <Image src={"/profile.svg"} alt={"profile"} width={28} height={28} />
      <div className="flex flex-col">
        <p className="font-medium">You</p>
        <p className="mt-2 font-regular text-grey-800">{query.query}</p>
      </div>
    </div>
  );
}
