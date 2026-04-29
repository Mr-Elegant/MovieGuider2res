import Notfound from "/NotFanimeg.png"


const NotFound404 = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#0D0F14] p-6">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30">
          <img className="max-h-[75vh] w-full max-w-3xl object-contain" src={Notfound} alt="" />
        </div>
    </div>
  )
}

export default NotFound404
