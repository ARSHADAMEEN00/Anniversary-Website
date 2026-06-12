export async function downloadElementAsPng(element, fileName = 'marriage-renewal-certificate.png') {
  if (!element) return;

  const { default: html2canvas } = await import('html2canvas');
  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: null,
    useCORS: true,
  });

  const link = document.createElement('a');
  link.download = fileName;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

export async function downloadElementAsPdf(element, fileName = 'marriage-renewal-certificate.pdf') {
  if (!element) return;

  const { default: html2canvas } = await import('html2canvas');
  const { jsPDF } = await import('jspdf');
  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: '#fafdff',
    useCORS: true,
  });

  const imageData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
    unit: 'px',
    format: [canvas.width, canvas.height],
  });

  pdf.addImage(imageData, 'PNG', 0, 0, canvas.width, canvas.height);
  pdf.save(fileName);
}

export async function shareCertificate() {
  const shareData = {
    title: 'Marriage Contract Renewed',
    text: 'Our marriage contract is officially renewed for life.',
    url: window.location.href,
  };

  if (navigator.share) {
    await navigator.share(shareData);
    return 'Shared successfully.';
  }

  await navigator.clipboard.writeText(window.location.href);
  return 'Share link copied.';
}
