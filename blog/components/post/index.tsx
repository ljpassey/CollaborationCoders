import Image from "next/image";

interface PostProps {
  title: string;
  bannerImage: string;
  bannerImageWidth: number;
  bannerImageHeight: number;
  content: string;
}

export function Post(props: PostProps) {
  const { title, content, bannerImage, bannerImageWidth, bannerImageHeight } =
    props;

  return (
    <article >
      <h1 className="text-6xl font-black text-white mb-8">{title}</h1>
      <Image
        alt="Blog Image"
        src={bannerImage}
        // width={bannerImageWidth}
        width={"800"}
        height={bannerImageHeight}
        className="[width: 800px]!"
      />
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </article>
  );
}
