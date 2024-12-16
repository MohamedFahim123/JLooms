import Image from "next/image";

interface ParentCard {
    name: string;
    code: string;
    imageUrl: string;
}

export default function ParentCard({
    name,
    code,
    imageUrl,
}: ParentCard) {
    return (
        <div className="w-[220px] h-[250px] bg-[#FAFCFF] shadow-md rounded-3xl flex flex-col items-center p-4 border-x border-y border-[#eeeeee]">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#9C73F7]">
                <Image
                    src={imageUrl}
                    alt={name}
                    width={160}
                    height={160}
                    className="object-cover p-2"
                />
            </div>
            <div className="text-center mt-4">
                <h2 className="text-2xl text-[#1A1B23]">{name}</h2>
                <p className="text-lg text-[#919191] mt-2">{code}</p>
            </div>
        </div>
    );
};