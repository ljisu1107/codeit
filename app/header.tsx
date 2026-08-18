import Image from "next/image";

export default function Header()  {
  return (
    <div className="flex w-full items-center justify-center bg-white margin-[0 auto] border-b border-b-(--state-200)">
      <div className="flex w-full max-w-7xl flex-col items-start justify-between bg-white margin-[0 auto] py-4 pl-6">
        <a href="/">
          {/* 반응형 로고 모바일 크기 이상일 때 lage 로고로, 모바일 크기면 small 로고로*/}
          <Image
            className="h-max[40px] hidden w-max-[150px] sm:hidden md:inline lg:inline"
            src="/logo_large.svg"
            alt="doit logo"
            width={150}
            height={40}
            priority
          />
          <Image
            className="h-max[20px] w-max-[80px] sm:inline md:hidden lg:hidden"
            src="/logo_small.svg"
            alt="doit logo"
            width={80}
            height={20}
            priority
          />
        </a>
      </div>
    </div>
  );
};
