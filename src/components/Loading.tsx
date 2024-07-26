const Loading: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 items-center justify-center text-center">
      <div className="flex flex-row space-x-3 items-center justify-center">
        {/* <ImgClear className="animate-pulse w-[100px] h-100px]" /> */}
        <h1 className="text-white text-3xl max-sm:text-sm animate-pulse">L O A D I N G</h1>
      </div>
    </div>
  )
}

export default Loading;