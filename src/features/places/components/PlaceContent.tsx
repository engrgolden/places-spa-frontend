const PlaceContent: React.FC<{
  name: string;
  address: string;
  description: string;
  imageUrl: string;
}> = ({ name, address, description, imageUrl }) => {
  return (
    <section
      className="border-b border-black
"
    >
      <section className="w-full h-64 ">
        <img
          className="w-full h-full object-cover object-[50%_30%]"
          src={imageUrl}
          alt={`Picture of ${name}'`}
        />
      </section>
      <section className="flex flex-col items-center py-2">
        <h1 className="font-bold 2xs:text-2xl text-sm text-center">{name}</h1>
        <h2 className="font-bold 2xs:text-lg text-xs text-center">{address}</h2>
        <p className="2xs:text-sm text-xs text-center">{description}</p>
      </section>
    </section>
  );
};

export default PlaceContent;
