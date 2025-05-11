'use client';
import MyLocationMap from '@/components/MyLocationMap';


export default function Home() {
  return (
    <main className="flex min-h-screen max-w-screen flex-col items-center justify-start py-24 px-16">
      <section className='w-full  flex gap-5 h-screen'>
        <aside className='w-1/4 h-full'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed numquam officiis quaerat neque a ipsum. Asperiores esse ducimus officiis voluptas, quisquam dignissimos aspernatur incidunt quo. Accusantium corporis vitae facere optio.</aside>
        <div className='w-3/4 h-full '><MyLocationMap/></div>
      </section>
    </main>
  );
}
