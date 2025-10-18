

const Breadcrum = ({ heading, page_title, imagePath }) => {
  const style = {
    backgroundImage:
      `url(${imagePath})`,
  }

  return (
    <section className="relative w-full h-fit mx-auto mt-16">
      <div className="max-w-6xl px-4 mx-auto py-32 flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center"
          style={style}
        ></div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-slate-800 opacity-69"></div>
        {/* Content */}
        <div className="relative mx-auto z-10 text-white px-6 max-w-4xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold">
            {heading}
          </h1>
          <a href='/home'>Home</a>&nbsp;&gt;&nbsp;<span>{page_title}</span>
        </div>
      </div>
    </section>
  )
}

export default Breadcrum