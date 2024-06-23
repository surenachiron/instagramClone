import Box from '@/components/Box';
import GradientText from '@/components/GradientText';

const emailSentPage = () => {
  return (
    <div className="w-full h-fit rounded-xl flex justify-center items-center gap-3 px-3 tablet:px-1 desktop:px-6 backdrop-blur-lg">
      <Box align="items-center" classes="w-full tablet:w-[70%] desktop:w-[42%] p-4 gap-3">
        <GradientText Wrapper={'h3'} text="An email has been sent." classes="text-2xl font-bold" />
        <hr className="w-full mb-3" />
        <div className="w-full text-start">
          <p className="mb-2">Thank you!</p>
          <p>If the email address exists in our system, an email with the reset link has been sent.</p>
        </div>
      </Box>
    </div>
  );
};

export default emailSentPage;
