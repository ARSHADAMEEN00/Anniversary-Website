export async function downloadElementAsPng(element, fileName = 'marriage-renewal-certificate.png') {
  if (!element) return;

  const { default: html2canvas } = await import('html2canvas');
  
  // Clone element to render it in a desktop-like wide view
  const clone = element.cloneNode(true);
  clone.style.width = '1000px';
  clone.style.position = 'absolute';
  clone.style.top = '-9999px';
  clone.style.left = '-9999px';
  document.body.appendChild(clone);

  // Wait briefly for style/font inheritance
  await new Promise((resolve) => setTimeout(resolve, 50));

  const canvas = await html2canvas(clone, {
    scale: 2,
    backgroundColor: null,
    useCORS: true,
    windowWidth: 1024,
  });

  document.body.removeChild(clone);

  const link = document.createElement('a');
  link.download = fileName;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

export async function downloadElementAsPdf(element, fileName = 'marriage-renewal-certificate.pdf') {
  if (!element) return;

  const { default: html2canvas } = await import('html2canvas');
  const { jsPDF } = await import('jspdf');

  // Clone element to render it in a desktop-like wide view
  const clone = element.cloneNode(true);
  clone.style.width = '1000px';
  clone.style.position = 'absolute';
  clone.style.top = '-9999px';
  clone.style.left = '-9999px';
  document.body.appendChild(clone);

  // Wait briefly for style/font inheritance
  await new Promise((resolve) => setTimeout(resolve, 50));

  const canvas = await html2canvas(clone, {
    scale: 2,
    backgroundColor: '#fafdff',
    useCORS: true,
    windowWidth: 1024,
  });

  document.body.removeChild(clone);

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
