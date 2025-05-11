'use client';
import MyLocationMap from '@/components/MyLocationMap';


export default function Home() {


  return (
    <section style={{ width: '100%', height: '100vh' }}>
      <h1>Add Google Maps and Places</h1>
      <MyLocationMap/>
    </section>
  );
}
