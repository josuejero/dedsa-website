interface PageProps {
  params: { slug: string };
}

export default function NewsletterArticlePage({ params }: PageProps) {
  // TODO: Implement newsletter article page
  return (
    <div className="container-page py-12">
      <h1>Newsletter Article: {params.slug}</h1>
    </div>
  );
}
