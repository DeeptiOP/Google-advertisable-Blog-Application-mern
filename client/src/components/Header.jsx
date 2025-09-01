import React from "react";
import {  Search,  } from "lucide-react"
import { Link,  } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { useRef } from "react";
const Header = () => {


  const {setInput,input}=useAppContext()
  const inputRef=useRef()
  const onSubmitHandler=async(e)=>{

e.preventDefault()
setInput(inputRef.current.value)
  }
  const onClear=()=>{
    setInput('')
    inputRef.current.value=""
  }
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-20 mb-8">
        <div className=" inline-flex items-center justify-center gap-4 px-6  py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary">
          <p>New AI feature integrated</p>
          {/* <img src="" alt="" className="w-2.5" /> */}

        </div>
        <h1 className=" text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700"> Your own <span className="text-primary">blogging</span><br/>platform </h1>
     
     <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500" >This is your space to think out loud, to share what matters, and to write without filters. Whether it's one word or thousand, your story starts right here.  </p>
     <form onSubmit={onSubmitHandler} className=" flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden">
    <input ref={inputRef} className="w-full pl-4 outline-none"type="text" placeholder="Search for blogs"/>
    <button  className="bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer"type="submit"> Search </button>
    
  </form>
  <div className="text-center mt-3">
    {input &&<button onClick={onClear} className="border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer">Clear search</button>}
  </div>
      </div>
    
        
          {/* <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAKgAtAMBIgACEQEDEQH/xAAaAAADAQEBAQAAAAAAAAAAAAAAAQIDBAUH/8QAGhABAQEBAQEBAAAAAAAAAAAAAAERAhITA//EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EABoRAQEBAQEBAQAAAAAAAAAAAAABERICEwP/2gAMAwEAAhEDEQA/APq2lam1Oulkq1Olam08CrUXpN6TelSJqr0i1NqbTjL0dKFaJVMbFRcZyqlR6TjQ4UVGdpwYoQ0VcghyGabV4WCRUisRqpEyDFYchaMRgXgGjGNqbStTa63Rh2ptTam1RU7UWi1FpxGHanStTVIsXaWo3BoZ8tZ0qdMNVKVhct50056c06XOkXyMdM6aS65ee2k7Z3ycjdUYztU7Z3zVRqcZztXtFlUsI9j0WGsI9AYGG6iqTXU6uUVNq6mw5U3yiorTE2L0r5Z1LSwsPUcsxVYVmDU3wQ0FTLg9xU6QNLBy1nS5059V6Lkcuidqnbl9nOyvgY7J+ivo4/Z+0cDHX7E7cs7P2XAx1ew5fYHAx14mxrJpXlOu/ljU1t40fM+i4c/nR4dM/MfMdD5uW8Dw6vmPmOx83JeB4dd/NN/M+x83L5TeXVfzTeD6Tfzct5T5dN4TeFT0nhz2JbXhN5VKm+WYqrymw9K+SOUqIaeVSnOkAJsX6CABj3MGKhuLXp4jBi8GDQmQYuQYAjBi8GDSRYXlpgsGhleU3htgsPRjmvCOuHVYm8nKV8uO8M7y7Lyy65XqL5cvXKLy6euUXlUrOxzWJxveU2L1GMg0sTYcqbEhWA9Tj3jghuKu/SwYcMFqZDwwC0sGGDGlhWKKg9IUypUyLFAwzvLPrltU2HpVz9csry6rGd5VKixy3lN5dHXKLyuVFjC8pvLe8p8r1nYy8hr5A1GPXEAjldPRwyALoyoByJvoAqFYOhQVFpYc9GVpaLRi5T0J0aFadTTACKmxYpwqwsTeWtibDRWWJxtifK2dZ+Q0wBLuEKGwPoyoK05EX0ZWi0rVyJ6PRqdLqqw+jtTam1NoxU9L05WWj0WLla6NZSnKWLlaaN1Ep6WK1QpSjQNCbFFTTU4WLCoiowLwBDYEGEZdHSpVOrhWq1NpWptXE6r0m9JtTauQaL0n0VqNVipWnoemdolLGkrWU5WUo1NjSVrqpWOqlLFa20M5VSlh60CYoC0HCioEUgYCD0am0tYxzadqbS0rWkLRam0Ws7WkLVWs7Ram1cPRam1NpapUqrRKz0WjFytPRzplKcpWNJW06VKxlXKVi9ayrlZSqlRh62lVGcVCwtaRSIqArQAAnUanQGEchWptAaQJtRaYaQItZ2mGkOItTaAs06LQAuFpygBcXKuUBNUuVcpBCmnNaSkCC5VSmAmjQAEv/9k=" alt="" className="absolute -top-50 -z-1 opacity-50 " /> */}

</div> 
 
 
  );
};

export default Header;
