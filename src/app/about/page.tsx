'use client'
const about = () => {
  return <main>

    <div className="container">
      <div className="mt-10">
        <div className="grid grid-cols-2 gap-10  sm:grid-cols-1 text-2xl p-2   md:grid-cols-2">
          <div className="mb-48">
            <h1 className="text-4xl font-semibold  ">Our Mission</h1>
            <p className="mt-10 text-1xl"> Quasi expedita autem atque vero.Sunt tenetur quibusdam esse praesentium laudantium eos quaerat repudiandae at accusamus sapiente! ipsum dolor sit amet consectetur adipisicing elit. Numquam aut quas culpa nobis cupiditate optio, cum sapiente qui dolore repudiandae nostrum modi sit consequuntur corporis provident aperiam repellendus illum expedita doloribus ipsa suscipit enim! Aliquid ipsum modi officiis voluptas, incidunt, pariatur voluptatum id saepe illo dolorum perspiciatis quas ad. Necessitatibus.</p>
          </div>

          <img className="w-full" src="./assets/hero_image.svg" alt="hero image" />
        </div>

        <div className="grid grid-cols-2 gap-10 mt-20  sm:grid-cols-1 row-span-full text-2xl p-2   md:grid-cols-2">
          <img className="w-full sm:row-start-2 " src="./assets/hero_image.svg" alt="image-About" />
          <div>
            <h1 className="text-4xl font-semibold">Our Vision</h1>
            <p className="mt-10 text-2xl"> Quasi expedita autem atque vero.Sunt tenetur quibusdam esse praesentium laudantium eos quaerat repudiandae at accusamus sapiente! ipsum dolor sit amet consectetur adipisicing elit. Numquam aut quas culpa nobis cupiditate optio, cum sapiente qui dolore repudiandae nostrum modi sit consequuntur corporis provident aperiam repellendus illum expedita doloribus ipsa suscipit enim! Aliquid ipsum modi officiis voluptas, incidunt, pariatur voluptatum id saepe illo dolorum perspiciatis quas ad. Necessitatibus.</p>
          </div>

        </div>

      </div>
    </div>
  </main>;
};

export default about;