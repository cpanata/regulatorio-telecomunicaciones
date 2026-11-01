# Regulatorio Telecomunicaciones

Landing page estática, adaptable a móviles y sin dependencias de compilación.

La identidad gráfica incluye un logotipo vectorial original, un favicon y dibujos SVG integrados para las tarjetas de servicios y los ocho estudios de ingeniería. Se muestran directamente desde el sitio, sin descargas de imágenes ni paquetes externos.

Los servicios tienen accesos directos y consultas de WhatsApp con el tema precargado. La navegación incluye acceso rápido a cada servicio, y la página tiene un enlace para saltar al contenido y metadatos de vista previa al compartirla.

La sección **Estudios de ingeniería** describe estudios para SAI, AVS, radiocomunicaciones VHF/UHF, FM, televisión VHF/UHF, sistemas satelitales, redes privadas y enlaces de Modulación Digital de Banda Ancha (MDBA). Confirma los requisitos vigentes con ARCOTEL antes de preparar documentación para un trámite.

Las fichas de servicios y estudios se expanden al seleccionarlas para mostrar el tipo de trámite, una lista inicial de requisitos y enlaces a fuentes de ARCOTEL. El reporte diferencia título habilitante, registro, concesión, autorización y permiso; es una guía informativa, no asesoría legal ni sustituto de la ficha vigente o resolución aplicable al solicitante.

La ficha SIETEL resume el alcance y plazo publicados en el [portal oficial de ARCOTEL](https://apc.arcotel.gob.ec/sietel1/index.aspx). Confirma siempre en el sistema y en los oficios recibidos qué formularios y periodicidad aplican al prestador.

La ficha FODETEL distingue entre las gestiones de obligaciones de operadores y los asuntos asociados a proyectos de servicio universal. Presenta el origen legal como contexto histórico y dirige a ARCOTEL para verificar los procedimientos vigentes.

La ficha de planes de contingencia refleja el plazo anual y alcance publicados por ARCOTEL; valida en el portal de la Agencia el formato vigente, las instrucciones del año y el servicio al que corresponde el título habilitante.

La ficha SISREGI describe la declaración semestral de ingresos y enlaza al portal y al aviso oficial de ARCOTEL. Las fechas deben confirmarse en la resolución o comunicación oficial de cada período, pues las publicadas para 2023 son históricas.

## Edición del contenido

La página obtiene los textos editables desde `content/site.json` cuando se sirve por HTTP/HTTPS. El archivo `content-loader.js` aplica esos valores de forma segura y también actualiza el número y los mensajes de WhatsApp. Al abrir `index.html` directamente como archivo, se conserva la vista estática de respaldo; para comprobar los cambios del JSON usa un servidor local, por ejemplo `python -m http.server 8000`, y abre `http://localhost:8000`.

El panel privado usa Decap CMS con Netlify Identity y Git Gateway. No se guarda ninguna contraseña en los archivos del sitio. Para habilitarlo:

1. Crea un repositorio en GitHub con los archivos del sitio en la raíz y la rama `main`.
2. En Netlify, importa ese repositorio como un sitio nuevo. No hace falta comando de compilación; publica la carpeta raíz del proyecto.
3. En la configuración del sitio en Netlify, habilita **Identity** y configura el registro solo por invitación. Invita únicamente el correo del propietario que administrará los textos.
4. En **Identity → Services**, habilita **Git Gateway** para que el panel pueda guardar los cambios en el repositorio.
5. Abre `https://tu-sitio.netlify.app/admin/`, acepta la invitación e inicia sesión. Desde **Contenido del sitio** puedes actualizar marca, portada, servicios, descripciones de estudios, consejos, casos ilustrativos, contacto y mensajes de WhatsApp. Los cambios se guardan en GitHub y se publican mediante Netlify.

Git Gateway figura actualmente como una función beta de Netlify; confirma que siga disponible para tu sitio antes de completar la configuración.

El panel mantiene exactamente tres consejos y tres casos para ajustarse al diseño. Los requisitos, tipos de trámite, enlaces de normativa y fichas regulatorias desplegables se mantienen fijos en `index.html` para evitar cambios accidentales; deben revisarse y actualizarse manualmente por una persona responsable cuando cambie la normativa. Los casos actuales son ilustrativos: reemplázalos solo por experiencias reales verificables y autorizadas, o conserva claramente el aviso que los identifica como ejemplos.

El teléfono se edita en el CMS como número internacional sin espacios ni signos (por ejemplo, `593991234567`) y su formato visible se configura en el campo **Teléfono visible**. Un número inválido deshabilita los enlaces de WhatsApp y muestra un aviso en la página, en vez de enviar consultas al destino equivocado.

El formulario de contacto no transmite ni almacena información en el sitio: prepara el texto en WhatsApp para que la persona lo revise y lo envíe voluntariamente. Se solicita únicamente un nombre opcional, el servicio y la consulta; se recomienda no incluir información confidencial.

## Mejoras sugeridas para revisar antes de publicar

- Confirmar el nombre comercial, logotipo definitivo, datos del responsable y ubicación/área de atención.
- Validar que el número de WhatsApp esté activo para recibir consultas y que los mensajes precargados representen el servicio ofrecido.
- Reemplazar los casos ilustrativos por casos reales autorizados, con resultados verificables y permiso del cliente.
- Revisar con asesoría competente el aviso de privacidad y los textos legales antes de habilitar formularios, analítica o recolección de datos personales.
- Hacer una revisión final de requisitos y enlaces de ARCOTEL; definir quién actualizará el contenido cuando cambien normas o fechas.
- Tras publicar, configurar dominio propio si se desea, revisar el título y la descripción en redes, y comprobar la experiencia desde teléfonos reales.

## Publicar gratis

Para usar el panel de edición, publica desde el repositorio Git conectado a Netlify siguiendo los pasos anteriores. Netlify Drop permite publicar una vista estática, pero no configura por sí solo Git Gateway ni el guardado de cambios desde el CMS. Consulta los límites y condiciones actuales del plan gratuito de Netlify.
