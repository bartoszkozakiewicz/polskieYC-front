const CustomLoader = () => {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default CustomLoader;
