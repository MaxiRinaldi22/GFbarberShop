export default function Loading() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-10">
            <section>
                <div className="relative mx-auto w-full max-w-7xl items-center bg-white px-5 py-12 md:px-12 lg:px-20">
                    <div className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
                        <div className="flex flex-col">
                            <div>
                                <h2 className="pb-10 text-center text-4xl text-black">
                                    Cargando...
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}