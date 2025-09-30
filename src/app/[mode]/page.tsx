import { notFound } from 'next/navigation';
import GuideClientPage from './guide-client-page';

type GuidePageProps = {
  params: {
    mode: string;
  };
};

export default function GuidePage({ params }: GuidePageProps) {
  const { mode } = params;

  if (!['bus', 'metro', 'railway'].includes(mode)) {
    notFound();
  }

  return <GuideClientPage mode={mode} />;
}

export function generateStaticParams() {
  return ['bus', 'metro', 'railway'].map((mode) => ({
    mode,
  }));
}
