export default function IndexPage() {
  return (
    <section className="container grid items-center mt-4">
      <div className="h-[calc(100vh-92px)] flex flex-col items-start gap-2">
        <iframe
          width="100%"
          height="100%"
          src="/editor/CrystalEditor/index.html"
        ></iframe>
      </div>
      <div className=" h-full"></div>
    </section>
  )
}
