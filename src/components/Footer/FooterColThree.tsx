const FooterColThree = () => {
  return (
    <div className="min-w-96">
      <h3 className="font-bold">Reach out to us now</h3>
      <form className="flex flex-col bg-transparent gap-2 ">
        <div className="grid gap-2 xl:grid-cols-2">
          <input
            className="p-1 border-4 rounded bg-inherit"
            type="text"
            placeholder="First name"
          />
          <input
            className="p-1 border-4 rounded bg-inherit"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          className="p-1 border-4 rounded bg-inherit"
          type="email"
          name="email"
          id="email"
          placeholder="Email address"
        />
        <textarea
          className="p-1 border-4 rounded bg-inherit"
          name=""
          id=""
          rows={4}
          placeholder="Query"
        />
        <button className="bg-colorPrimary w-fit py-2 px-4 text-white/80 font-bold rounded">
          Send now
        </button>
      </form>
    </div>
  );
};

export default FooterColThree;
