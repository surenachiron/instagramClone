import Image from 'next/image';
import Box from '@/components/Box';
import Button from '@/components/Button';
import GradientContainer from '@/components/GradientContainer';

type Props = { buttons: { primaryText: string; secondaryText?: string; bgColor?: string }[] };

const ProfileInfo = ({ buttons }: Props) => {
  return (
    <Box classes="relative px-6 gap-2 py-8 rounded-md w-full">
      <div className="absolute top-[-45px]">
        <GradientContainer classes="p-0.5" childClasses="p-0.5">
          <Image src={'/anonymous.png'} alt="test image" width={70} height={70} className="rounded-full" />
        </GradientContainer>
      </div>

      <div className="text-center my-2">
        <h3 className="text-xl font-bold text-black">Mohammad Karimi</h3>
        <p className="text-sm">maybe a programmer.</p>
      </div>

      <div className="flex flex-wrap justify-start gap-2">
        {buttons.map((but) => (
          <Button
            key={but.primaryText}
            classes={`flex-col bg-grayLight ${but?.bgColor} text-black px-3 py-1 rounded-lg w-fit`}
          >
            {but.secondaryText ? (
              <div className="flex flex-col items-center justify-center">
                <h4 className="text-md font-bold">{but.primaryText}</h4>
                <p className="text-sm text-[#a1a1a1]">{but.secondaryText}</p>
              </div>
            ) : (
              <p className="text-sm text-[#a1a1a1]">{but.primaryText}</p>
            )}
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-2 my-4 w-full">
        <p className="text-sm font-bold text-grayMiddle">posts - 29</p>
        <div className="grid grid-cols-12 gap-2">
          {buttons.map((butTest) => (
            <div
              key={butTest.primaryText}
              className="col-span-3 mobile:col-span-3 tablet:col-span-2 desktop:col-span-4"
            >
              <Image src={'/anonymous.png'} alt="test" className="rounded-lg w-full" width={70} height={70} />
            </div>
          ))}
          {buttons.map((butTest) => (
            <div
              key={butTest.primaryText}
              className="col-span-3 mobile:col-span-3 tablet:col-span-2 desktop:col-span-4"
            >
              <Image src={'/anonymous.png'} alt="test" className="rounded-lg w-full" width={70} height={70} />
            </div>
          ))}
          {buttons.map((butTest) => (
            <div
              key={butTest.primaryText}
              className="col-span-3 mobile:col-span-3 tablet:col-span-2 desktop:col-span-4"
            >
              <Image src={'/anonymous.png'} alt="test" className="rounded-lg w-full" width={70} height={70} />
            </div>
          ))}
          {buttons.map((butTest) => (
            <div
              key={butTest.primaryText}
              className="col-span-3 mobile:col-span-3 tablet:col-span-2 desktop:col-span-4"
            >
              <Image src={'/anonymous.png'} alt="test" className="rounded-lg w-full" width={70} height={70} />
            </div>
          ))}
          {buttons.map((butTest) => (
            <div
              key={butTest.primaryText}
              className="col-span-3 mobile:col-span-3 tablet:col-span-2 desktop:col-span-4"
            >
              <Image src={'/anonymous.png'} alt="test" className="rounded-lg w-full" width={70} height={70} />
            </div>
          ))}
        </div>
        <div className="flex justify-center my-2">
          <Button classes="text-sm rounded-lg bg-grayLight w-fit px-2 py-1">Hide your posts</Button>
        </div>
      </div>
    </Box>
  );
};

export default ProfileInfo;
