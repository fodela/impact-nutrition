import Image from "next/image";

const AnalyticContent = () => {
  return (
    <div className="flex gap-4">
      <div>
        <Image
          height={130}
          width={130}
          src="/../../favicon.ico"
          alt="analytics image"
        />
      </div>
      <div>
        <h5 className="font-bold text-3xl mb-4">Sed ut perspiciatis</h5>
        <p className="text-lg">
          Consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit, sed quia non numquam.
        </p>
      </div>
    </div>
  );
};

export default AnalyticContent;
