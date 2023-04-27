import Image from "next/image";
const Testimony = () => {
  return (
    <div className="flex items-center w-72" style={{ width: "25rem" }}>
      <Image
        src="/../favicon.ico"
        alt="testimony image"
        width={45}
        height={45}
      />
      <div className="p-6">
        <p className="mb-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer{" "}
        </p>
        <p className="font-bold text-xl">Lorem Ipsum</p>
      </div>
    </div>
  );
};

export default Testimony;
