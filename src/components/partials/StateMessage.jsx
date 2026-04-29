const StateMessage = ({ title, message, actionLabel, onAction }) => {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center bg-[#0D0F14] p-6 text-white">
      <div className="max-w-lg rounded-3xl border border-white/10 bg-white/[0.05] p-8 text-center shadow-2xl shadow-black/30">
        <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-[#F56009]/15 text-3xl text-[#F56009]">
          <i className="ri-film-line"></i>
        </div>
        <h1 className="text-3xl font-black">{title}</h1>
        <p className="mt-3 leading-7 text-zinc-400">{message}</p>
        {actionLabel && (
          <button onClick={onAction} className="mt-6 rounded-full bg-[#F56009] px-6 py-3 font-bold text-white duration-300 hover:bg-[#ff751f]">
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default StateMessage;
