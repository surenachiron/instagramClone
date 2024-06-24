const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container py-5">
      <div className="min-h-[90vh] flex items-center justify-center">{children}</div>
    </div>
  );
};

export default AuthLayout;
