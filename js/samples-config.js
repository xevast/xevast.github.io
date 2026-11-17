/* Optional captions for the sample galleries.
   Samples live in  samples/<page-name>/  and are named 1.jpg, 2.jpg ... 5.jpg  (.png / .webp / .pdf also work).
   Nothing else is needed: drop the files in the folder and they appear on that page.
   To add a title or short text for a sample, list them here in the same order (1 is first):

   window.XEVAST_SAMPLES = {
     'web-development': [
       { title: 'Restaurant website', text: 'Landing page with an online menu.' },
       { title: 'Clinic website',     text: 'Booking form and WhatsApp button.' }
     ]
   };

   You can also point a sample to a different file name:  { file: 'my-shot.png', title: '...' }
*/
window.XEVAST_SAMPLES = window.XEVAST_SAMPLES || {};
