export default function BackgroundAura() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Warm journal gradient base */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 15% 20%, rgba(196,145,122,0.22), transparent 34%),' +
            'radial-gradient(circle at 80% 10%, rgba(201,150,58,0.14), transparent 28%),' +
            'linear-gradient(165deg, #F5EDE0 0%, #FDF8F2 55%, #F2D9CE 100%)',
        }}
      />
      {/* Soft blush blob top-left */}
      <div
        style={{
          position: 'absolute',
          left: '8%',
          top: '13%',
          height: 220,
          width: 220,
          borderRadius: '50%',
          background: 'rgba(232,197,181,0.38)',
          filter: 'blur(48px)',
        }}
      />
      {/* Soft gold blob top-right */}
      <div
        style={{
          position: 'absolute',
          right: '5%',
          top: '18%',
          height: 256,
          width: 256,
          borderRadius: '50%',
          background: 'rgba(232,201,122,0.22)',
          filter: 'blur(48px)',
        }}
      />
      {/* Soft sage blob bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '28%',
          height: 280,
          width: 280,
          borderRadius: '50%',
          background: 'rgba(197,217,195,0.28)',
          filter: 'blur(56px)',
        }}
      />
    </div>
  );
}
