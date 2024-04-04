"use client";

import Image from "next/image";
import { Button } from "@ryuk/ui/button";
import { useEffect, useState } from "react";
import { Hero } from "@/components/hero";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function Web() {
  const [name, setName] = useState<string>("");
  const [response, setResponse] = useState<{ message: string } | null>(null);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    setResponse(null);
    setError(undefined);
  }, [name]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await fetch(`${API_HOST}/message/${name}`);
      const response = await result.json();
      setResponse(response);
    } catch (err) {
      console.error(err);
      setError("Unable to fetch response");
    }
  };

  const onReset = () => {
    setName("");
  };

  return (
    <div className="w-full h-full overflow-x-hidden">
      {/* <div className="absolute top-0 left-0 w-full h-full bg opacity-50 z-[-1]">
        <Image
          src="./Doubs.svg"
          alt="bg"
          fill
          // width={1600}
          // height={1200}
          sizes="100%"
          className="z-[-1]"
          objectFit="cover"
        />
      </div> */}
      <Hero />
      {/* <div className="absolute top-[100px] right-[-500px] w-full ">
        <Image
          width={400}
          height={400}
          alt=""
          className=" mix-blend-multiply "
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyG6_ZdrBQ8rXkS7wECudiGo4c7gzE7vUXEo7RKhG_lQH7nVQMPaaESj_iCNz7F9Z5NN8&usqp=CAU"
        ></Image>
      </div> */}
    </div>
  );
}
