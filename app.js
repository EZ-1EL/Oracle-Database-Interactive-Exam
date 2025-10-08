  // Timer (1 hour)
  let totalSeconds = 60 * 60;
  let timerInterval;
  function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (totalSeconds <= 0) {
        clearInterval(timerInterval);
        finishQuiz();
        return;
      }
      totalSeconds--;
      const m = Math.floor(totalSeconds / 60), s = totalSeconds % 60;
      document.getElementById('timer').textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    }, 1000);
  }

  // Questions (83) - English Qs, Arabic hints - Combined from IIS406, RMAN, Flashback Chapter 10 notes

    const questionsMaster = [
  {type:'tf', q:'True or False: The basic data structure of the relational model is the table.', ans:true, hint:'صحيح — الهيكل الأساسي في النموذج الارتباطي هو الجدول.'},
  {type:'mcq', q:'In RDBMS, information about a particular entity is represented in:', choices:['Tables only','Columns and rows','Keys only','Schemas'], ans:1, hint:'المعلومات عن الكيان تمثل في الأعمدة والصفوف داخل الجداول.'},
  {type:'tf', q:'True or False: Tables in RDBMS can have keys used to join data from two or more tables.', ans:true, hint:'صحيح — المفاتيح تستخدم لربط البيانات بين جداول متعددة.'},
  {type:'mcq', q:'Database schemas are:', choices:['Physical storage units','A set of related tables and other database objects','Backup files','User passwords'], ans:1, hint:'الـ schemas مجموعة من الجداول والكائنات المتعلقة مرتبطة بمستخدم.'},
  {type:'tf', q:'True or False: SQL is a Structured Query Language that enables manipulation of data in a database.', ans:true, hint:'صحيح — SQL لغة للاستعلامات الهيكلية للتعامل مع البيانات.'},
  {type:'mcq', q:'In the relational data model, data is seen by users in the form of:', choices:['Graphs','Tables alone','Files','Networks'], ans:1, hint:'البيانات تُرى كجداول فقط في النموذج الارتباطي.'},
  {type:'order', q:'Order the steps for a two-tier application (correct order):', items:['User’s workstation has the application program','Data stored on a remote database server'], solution:[0,1], hint:'المحطة تحتوي البرنامج، والبيانات على خادم قاعدة بيانات بعيد.'},
  {type:'mcq', q:'In three-tier applications, the application server acts as:', choices:['Storage for data','Interface between clients and database server','User interface only','Backup server'], ans:1, hint:'الخادم التطبيقي يعمل كواجهة بين العملاء وخادم قاعدة البيانات.'},
  {type:'tf', q:'True or False: Oracle DBA’s role includes ensuring database security and backups.', ans:true, hint:'صحيح — دور DBA يشمل الأمان، النسخ الاحتياطي، الأداء، التصميم، والتنفيذ.'},
  {type:'mcq', q:'Which cloud service delivers computer hardware like servers and storage as a service?', choices:['PaaS','SaaS','IaaS','Public Cloud'], ans:2, hint:'IaaS يوفر الأجهزة كخدمة.'},
  {type:'tf', q:'True or False: PaaS offers development environments for building cloud applications.', ans:true, hint:'صحيح — PaaS يقدم بيئات تطوير للتطبيقات السحابية.'},
  {type:'mcq', q:'SaaS involves a provider hosting business applications and delivering them to:', choices:['Developers only','Customers over the internet','Hardware vendors','Internal servers'], ans:1, hint:'SaaS يستضيف التطبيقات ويوفرها للعملاء.'},
  {type:'order', q:'Order the main components of public cloud (correct order):', items:['Restful web service access','Express for creating applications'], solution:[0,1], hint:'الوصول عبر RESTful، ثم Express للتطبيقات.'},
  {type:'tf', q:'True or False: Private cloud uses local data centers with a single database supporting multiple departments.', ans:true, hint:'صحيح — السحابة الخاصة تستخدم مراكز بيانات محلية مع قاعدة بيانات واحدة لأقسام متعددة.'},
  {type:'mcq', q:'Traditional database management requires:', choices:['No infrastructure','Managing databases in data centers and costly equipment','Only cloud skills','No technical employees'], ans:1, hint:'التدبير التقليدي يحتاج بنية تحتية، إدارة في مراكز، تكاليف، ومهارات فنية.'},
  {type:'tf', q:'True or False: In Oracle Multitenant, CDB contains the data dictionary visible to all PDBs.', ans:true, hint:'صحيح — CDB يحتوي قاموس البيانات المرئي لكل PDBs.'},
  {type:'mcq', q:'PDB in Multitenant architecture contains:', choices:['Control files and redo logs','Information specific to the local PDB only','All common objects','Global users'], ans:1, hint:'PDB يحتوي معلومات محلية فقط، بدون control files أو redo logs.'},
  {type:'order', q:'Order steps to create and configure CDB (correct order):', items:['Use DBCA','Use OUI','Manual Creation'], solution:[1,0,2], hint:'OUI، DBCA، أو إنشاء يدوي.'},
  {type:'tf', q:'True or False: PDB can be created as a clone of an existing PDB.', ans:true, hint:'صحيح — PDB يُنشأ كنسخة من seed أو clone موجود.'},
  {type:'mcq', q:'To connect to CDB root, you can use:', choices:['sqlplus user/pass@service','sqlplus / as sysdba with OS auth','netca only','PDB service'], ans:1, hint:'للـ root، استخدم OS auth أو sqlplus / as sysdba.'},
  {type:'tf', q:'True or False: Common users are present in all containers (root and PDBs).', ans:true, hint:'صحيح — المستخدمون المشتركون موجودون في كل الحاويات.'},
  {type:'mcq', q:'Local users are present only in:', choices:['Root container','A specific PDB','All PDBs','CDB only'], ans:1, hint:'المستخدمون المحليون في PDB محدد فقط.'},
  {type:'order', q:'Order startup/shutdown for PDB (correct order):', items:['STARTUP FORCE','SHUTDOWN IMMEDIATE','STARTUP OPEN READ WRITE RESTRICT'], solution:[0,2,1], hint:'ابدأ بـ FORCE، ثم OPEN، ثم SHUTDOWN، مع ذكر اسم PDB.'},
  {type:'tf', q:'True or False: Control files are critical; without them, you cannot open data files.', ans:true, hint:'صحيح — ملفات التحكم حاسمة لفتح ملفات البيانات.'},
  {type:'mcq', q:'The utility to manage backup, restore, and recovery is:', choices:['DBCA','SQL*Plus','RMAN','OUI'], ans:2, hint:'RMAN لإدارة النسخ والاستعادة.'},
  {type:'tf', q:'True or False: The smallest allocation unit is the data block.', ans:true, hint:'صحيح — الوحدة الأصغر هي data block.'},
  {type:'mcq', q:'Stand-alone RMAN commands are executed at:', choices:['Within RUN block only','RMAN prompt and cannot be subcommands in RUN','As job commands only','In SQL*Plus'], ans:1, hint:'الأوامر المستقلة في prompt RMAN، غير داخل RUN.'},
  {type:'tf', q:'True or False: Recovery Window retention policy establishes a time period for point-in-time recovery.', ans:true, hint:'صحيح — Recovery Window يحدد فترة زمنية للاستعادة.'},
  {type:'mcq', q:'Redundancy retention policy keeps a specified number of:', choices:['Time periods','Backups','Logs only','Users'], ans:1, hint:'Redundancy يحتفظ بعدد محدد من النسخ.'},
  {type:'order', q:'Order steps to enable Controlfile Autobackup (correct order):', items:['CONFIGURE CONTROLFILE AUTOBACKUP ON','CONFIGURE CONTROLFILE AUTOBACKUP FORMAT FOR DEVICE TYPE DISK TO path'], solution:[0,1], hint:'فعل الـ autobackup، ثم تحديد التنسيق.'},
  {type:'tf', q:'True or False: Auxiliary database is created using RMAN DUPLICATE command.', ans:true, hint:'صحيح — قاعدة بيانات مساعدة بـ DUPLICATE.'},
  {type:'mcq', q:'Job commands in RMAN must be within:', choices:['Stand-alone prompt','Braces of a RUN command','SQL blocks','DBCA'], ans:1, hint:'Job commands داخل RUN {}.'},
  {type:'tf', q:'True or False: Online redo logs cannot be backed up by RMAN.', ans:true, hint:'صحيح — لا يمكن نسخ redo logs عبر RMAN.'},
  {type:'mcq', q:'A full backup contains:', choices:['Only changed blocks','All used data file blocks','Archived logs only','Temp files'], ans:1, hint:'النسخ الكامل يحتوي كل blocks المستخدمة.'},
  {type:'order', q:'Order types of incremental backups (correct order):', items:['Level 0 (full marked)','Cumulative Level 1','Differential Level 1'], solution:[0,1,2], hint:'Level 0 كامل، Cumulative تغييرات من 0، Differential من آخر incremental.'},
  {type:'tf', q:'True or False: Enabling Block Change Tracking speeds up incremental backups.', ans:true, hint:'صحيح — Block Change Tracking يسرع الـ incremental.'},
  {type:'mcq', q:'To back up only files in Fast Recovery Area, use:', choices:['BACKUP DATABASE','BACKUP RECOVERY AREA','BACKUP AS COPY','BACKUP ARCHIVELOG'], ans:1, hint:'BACKUP RECOVERY AREA للملفات في FRA فقط.'},
  {type:'tf', q:'True or False: For lost SPFILE, first step is STARTUP FORCE NOMOUNT.', ans:true, hint:'صحيح — ابدأ بـ NOMOUNT لاستعادة SPFILE.'},
  {type:'mcq', q:'For lost control file, after RESTORE, next is:', choices:['OPEN DATABASE','ALTER DATABASE MOUNT','SHUTDOWN','RECOVER PDB'], ans:1, hint:'بعد RESTORE، MOUNT ثم RECOVER ثم OPEN RESETLOGS.'},
  {type:'order', q:'Order steps for incomplete time-based recovery (correct order):', items:['SHUTDOWN IMMEDIATE','STARTUP FORCE MOUNT','RUN {SET UNTIL TIME; RESTORE; RECOVER;}','ALTER DATABASE OPEN RESETLOGS'], solution:[0,1,2,3], hint:'إغلاق، NOMOUNT/MOUNT، RUN block، OPEN RESETLOGS.'},
  {type:'tf', q:'True or False: ALTER DATABASE OPEN RESETLOGS is required after incomplete recovery.', ans:true, hint:'صحيح — مطلوب بعد incomplete recovery أو restore control file قديمة.'},
  {type:'mcq', q:'To switch a datafile to a new path with minimal downtime, use:', choices:['RESTORE DATAFILE','BACKUP AS COPY then SWITCH DATAFILE TO DATAFILECOPY','DROP DATAFILE','RENAME FILE'], ans:1, hint:'BACKUP AS COPY ثم SWITCH لنقل المسار بأقل توقف.'},
  {type:'tf', q:'True or False: Flashback Database requires ARCHIVELOG mode and setting DB_FLASHBACK_RETENTION_TARGET.', ans:true, hint:'صحيح — يحتاج ARCHIVELOG، FRA، و retention target قبل التمكين.'},
  {type:'tf', q:'True or False: When restoring an SPFILE from autobackup on a new host, you should SET DBID before the restore.', ans:true, hint:'صحيح — عند الاستعادة على سيرفر جديد غالباً لازم تستخدم SET DBID حتى RMAN يتعرف على autobackup.'},
  {type:'mcq', q:'Which startup mode is required before RESTORE SPFILE FROM AUTOBACKUP?', choices:['STARTUP OPEN','STARTUP MOUNT','STARTUP FORCE NOMOUNT','SHUTDOWN IMMEDIATE'], ans:2, hint:'SPFILE يُستعاد عندما تكون الـ instance في NOMOUNT.'},
  {type:'mcq', q:'After restoring SPFILE from autobackup, what is a common next step?', choices:['ALTER DATABASE OPEN','SHUTDOWN and STARTUP','RESTORE CONTROLFILE','ALTER DATABASE MOUNT'], ans:1, hint:'عادةً تعيد تشغيل الـ instance حتى يبدأ باستخدام الـ SPFILE المستعاد.'},
  {type:'order', q:'Order these steps when you lose all control files and have an autobackup (correct order):', items:['RECOVER DATABASE','RESTORE CONTROLFILE FROM AUTOBACKUP','ALTER DATABASE OPEN RESETLOGS','STARTUP FORCE NOMOUNT','ALTER DATABASE MOUNT'], solution:[3,1,4,0,2], hint:'STARTUP FORCE NOMOUNT ثم RESTORE CONTROLFILE ثم ALTER DATABASE MOUNT ثم RESTORE/RECOVER ثم OPEN RESETLOGS.'},
  {type:'mcq', q:'Which command should you run to mark a missing non-critical datafile offline before recovery?', choices:['ALTER DATABASE DATAFILE 7 OFFLINE','DROP DATAFILE 7','ALTER TABLESPACE USERS OFFLINE','ALTER DATABASE CLOSE'], ans:0, hint:'خذ الملف offline باستخدام ALTER DATABASE DATAFILE <n> OFFLINE قبل الاستعادة في بعض السيناريوهات.'},
  {type:'tf', q:'True or False: You can open the database with a non-critical datafile offline, then RESTORE and RECOVER that file.', ans:true, hint:'صحيح — ممكن تفتح DB مع جعل الملف offline؛ بعدها تستعيده وتعمل RECOVER وتعيده online.'},
  {type:'mcq', q:'If SYSTEM datafile is lost, which startup state is recommended before restoring it?', choices:['STARTUP MOUNT','STARTUP OPEN','STARTUP NOMOUNT','SHUTDOWN IMMEDIATE'], ans:0, hint:'لملفات النظام، يفضل STARTUP MOUNT لاستعادة الملف وتطبيق الاسترجاع.'},
  {type:'mcq', q:'Which of these was NOT listed as required backup types in your notes?', choices:['Backups of datafiles','Archived redo logs','At least one control file autobackup','A full export (expdp) dump'], ans:3, hint:'قائمتك تضمنت datafile backups وarchived logs وcontrolfile autobackup — الexport لم يُذكر كشرط.'},
  {type:'mcq', q:'For full database restore to a new server, which step must you do first?', choices:['RESTORE DATABASE','INSTALL Oracle software','RESTORE CONTROLFILE','STARTUP NOMOUNT'], ans:1, hint:'لازم تثبّت نفس نسخة برنامج Oracle على الخادم الجديد قبل أي خطوات RMAN.'},
  {type:'mcq', q:'Which RMAN command limits recovery to a specific time in an incomplete recovery?', choices:['SET UNTIL TIME','SET RECOVERY WINDOW','SET DB_FLASHBACK_RETENTION_TARGET','SET CONTROLFILE AUTOBACKUP FORMAT'], ans:0, hint:'استخدم SET UNTIL TIME داخل RUN block قبل RESTORE/RECOVER.'},
  {type:'tf', q:'True or False: After incomplete recovery you must open the database with ALTER DATABASE OPEN RESETLOGS.', ans:true, hint:'صحيح — بعد incomplete recovery تفتح DB بـ OPEN RESETLOGS.'},
  {type:'mcq', q:'Which scenario requires ALTER DATABASE OPEN RESETLOGS?', choices:['Normal open after clean shutdown','After restoring controlfile from an older backup or after incomplete recovery','When taking a tablespace offline','When enabling Flashback Database'], ans:1, hint:'يُستخدم OPEN RESETLOGS بعد استعادة controlfile قديمة أو بعد incomplete recovery.'},
  {type:'mcq', q:'Which RMAN command restores a specific datafile from backups?', choices:['RESTORE DATABASE','RESTORE CONTROLFILE','RESTORE DATAFILE 7','RESTORE ARCHIVELOG ALL'], ans:2, hint:'RESTORE DATAFILE <n> يستعمل لاستعادة ملف بيانات محدد.'},
  {type:'tf', q:'True or False: Flashback Database can rewind to any past time even if flashback logging was not enabled before that time.', ans:false, hint:'خطأ — Flashback يتطلب تمكينه وتخزين flashback logs قبل النقطة المطلوبة.'},
  {type:'mcq', q:'Which prerequisites are required to enable Flashback Database according to your notes?', choices:['ARCHIVELOG mode and configured Fast Recovery Area (FRA)','No prerequisites — just ALTER DATABASE FLASHBACK ON','Only RMAN must be running','A recovery catalog must exist'], ans:0, hint:'Flashback يحتاج ARCHIVELOG mode ومكان مخصص (FRA) لتخزين ملفات الفلاشباك.'},
  {type:'order', q:'Order steps to enable Flashback Database (correct order):', items:['ALTER SYSTEM SET DB_FLASHBACK_RETENTION_TARGET=2880 SCOPE=BOTH','STARTUP MOUNT','ALTER DATABASE FLASHBACK ON','SHUTDOWN IMMEDIATE','ALTER DATABASE ARCHIVELOG'], solution:[3,1,4,0,2], hint:'SHUTDOWN → STARTUP MOUNT → ALTER DATABASE ARCHIVELOG (if needed) → set retention → ALTER DATABASE FLASHBACK ON.'},
  {type:'mcq', q:'Which RMAN technique moves a datafile to a new path with minimal downtime?', choices:['SWITCH DATAFILE TO DATAFILECOPY after BACKUP AS COPY','ALTER DATABASE RENAME FILE','RESTORE DATABASE using new path','EXPORT/IMPORT the tablespace'], ans:0, hint:'BACKUP AS COPY ثم SWITCH DATAFILE TO DATAFILECOPY لتوجيه Oracle إلى النسخة الجديدة.'},
  {type:'mcq', q:'Before SWITCH DATAFILE TO DATAFILECOPY, which step is commonly performed?', choices:['ALTER DATABASE DATAFILE n OFFLINE','ALTER DATABASE OPEN','ALTER DATABASE BACKUP CONTROLFILE','ALTER SYSTEM SET DB_FLASHBACK_RETENTION TARGET'], ans:0, hint:'عادةً تأخذ الملف offline قبل تبديله إلى نسخة جديدة.'},
  {type:'tf', q:'True or False: TEMP datafiles should be restored and recovered the same way as permanent datafiles.', ans:false, hint:'خطأ — TEMP عادة يعاد إنشاؤه ولا يستعاد بنفس طريقة ملفات البيانات الدائمة.'},
  {type:'mcq', q:'Which item is part of the "Server field" required backup components in your notes?', choices:['At least one control file autobackup','An online export dump every hour','A separate RMAN catalog always','A standby database only'], ans:0, hint:'ذكرت وجود على الأقل backup آلي للـ controlfile كجزء أساسي.'},
  {type:'mcq', q:'If the controlfile autobackup belongs to a different DBID, which RMAN command helps before restoring it?', choices:['SET DBID <dbid>','SET UNTIL TIME','RECOVER DATABASE','ALTER DATABASE OPEN'], ans:0, hint:'SET DBID يخبر RMAN عن أي قاعدة تتعلق بها الـ autobackup في حالة عدم وجود controlfile.'},
  {type:'order', q:'Order minimal steps to perform a full restore of database on a new host (correct order):', items:['RECOVER DATABASE','RESTORE CONTROLFILE FROM AUTOBACKUP','INSTALL Oracle software','RESTORE SPFILE FROM AUTOBACKUP','STARTUP NOMOUNT','ALTER DATABASE MOUNT','RESTORE DATABASE','ALTER DATABASE OPEN RESETLOGS'], solution:[2,4,3,1,5,6,0,7], hint:'Install software → STARTUP NOMOUNT → RESTORE SPFILE → RESTORE CONTROLFILE → ALTER DATABASE MOUNT → RESTORE/RECOVER → OPEN RESETLOGS.'},
  {type:'mcq', q:'Which RMAN action will automatically restore needed archived redo logs during RECOVER?', choices:['RESTORE DATAFILE','RECOVER DATABASE','BACKUP AS COPY','SWITCH DATAFILE'], ans:1, hint:'RECOVER DATABASE تستدعي RMAN لاستعادة archived logs المطلوبة تلقائياً.'},
  {type:'mcq', q:'Which retention policy type keeps a specified number of backups (as in your notes)?', choices:['RECOVERY WINDOW','REDUNDANCY','ARCHIVELOG POLICY','FLASHBACK RETENTION'], ans:1, hint:'REDUNDANCY N يحتفظ بعدد N من النسخ الاحتياطية؛ RECOVERY WINDOW يعتمد على فترة زمنية.'},
  {type:'tf', q:'True or False: After restoring a controlfile from an older backup, Flashback Database still works for times before that restore.', ans:false, hint:'خطأ — استعادة أو إعادة إنشاء controlfile قد تؤدي لفقدان سجلات الفلاشباك ولا يسمح بالرجوع إلى أوقات قبل استعادة الcontrolfile.'},
  {type:'tf', q:'True or False: Oracle Flashback technologies are a set of data recovery solutions that provide capabilities to correct human errors by selectively undoing the effects of a mistake.', ans:true, hint:'صحيح — تقنيات Flashback تدعم الاستعادة على مستويات row, transaction, table, database.'},
  {type:'mcq', q:'Which Flashback feature views committed data as it existed at a past point in time using AS OF clause?', choices:['Flashback Version Query','Flashback Transaction Query','Flashback Query','Flashback Table'], ans:2, hint:'Flashback Query تستخدم AS OF TIMESTAMP أو SCN لعرض البيانات في وقت سابق.'},
  {type:'tf', q:'True or False: Flashback Version Query retrieves only committed data and includes deleted/reinserted row versions.', ans:true, hint:'صحيح — VERSIONS BETWEEN clause تُرجع تاريخ التغييرات للصفوف المُلتزمة.'},
  {type:'mcq', q:'Flashback Transaction Query is used to:', choices:['View changes at transaction level and generate undo SQL','Recover dropped tables','Rewind entire database','Query past versions of rows'], ans:0, hint:'Flashback Transaction Query لعرض التغييرات على مستوى المعاملة وإنشاء SQL للتراجع.'},
  {type:'tf', q:'True or False: Flashback Table restores tables and dependent objects like indexes and triggers from undo tablespace.', ans:true, hint:'صحيح — Flashback Table يستعيد الجداول والكائنات المرتبطة دون تأثير على باقي قاعدة البيانات.'},
  {type:'mcq', q:'To perform Flashback Table, which prerequisite is required?', choices:['Row movement enabled on the table','Recycle bin disabled','Full database backup','Flashback logs enabled'], ans:0, hint:'يجب تمكين ROW MOVEMENT بـ ALTER TABLE ENABLE ROW MOVEMENT.'},
  {type:'tf', q:'True or False: RETENTION GUARANTEE on undo tablespace ensures unexpired undo data is not overwritten, even if it causes transactions to fail.', ans:true, hint:'صحيح — RETENTION GUARANTEE يضمن الاحتفاظ بالـ undo، ويمنح الأولوية للاستعلامات على المعاملات.'},
  {type:'mcq', q:'Which command enables guaranteed undo retention?', choices:['ALTER SYSTEM SET UNDO_RETENTION=3600','ALTER TABLESPACE UNDOTBS1 RETENTION GUARANTEE','ALTER DATABASE FLASHBACK ON','SET RETENTION GUARANTEE'], ans:1, hint:'ALTER TABLESPACE undotbs RETENTION GUARANTEE يفرض الاحتفاظ بالـ undo.'},
  {type:'tf', q:'True or False: Flashback Drop reverses a DROP TABLE by retrieving from the recycle bin.', ans:true, hint:'صحيح — FLASHBACK TABLE TO BEFORE DROP يستعيد الجدول من Recycle Bin.'},
  {type:'mcq', q:'The Recycle Bin is controlled by which parameter?', choices:['UNDO_RETENTION','RECYCLEBIN','FLASHBACK_RETENTION_TARGET','RETENTION GUARANTEE'], ans:1, hint:'RECYCLEBIN=ON (default) يفعل الـ Recycle Bin للجداول المحذوفة.'},
  {type:'tf', q:'True or False: When dropping a tablespace with INCLUDING CONTENTS, objects in the recycle bin are purged.', ans:true, hint:'صحيح — DROP TABLESPACE INCLUDING CONTENTS يحذف الكائنات من Recycle Bin أيضاً.'},
  {type:'mcq', q:'To permanently drop a table without using recycle bin, use:', choices:['DROP TABLE emp','DROP TABLE emp PURGE','FLASHBACK TABLE emp TO BEFORE DROP','ALTER TABLE emp DISABLE ROW MOVEMENT'], ans:1, hint:'DROP TABLE <name> PURGE يحذف الجدول نهائياً دون وضعه في Recycle Bin.'},
  {type:'tf', q:'True or False: Flashback features like Query and Version Query do not modify the database; they are for investigation.', ans:true, hint:'صحيح — تستخدم للتحقيق والتحليل، لا تغير البيانات.'},
  {type:'mcq', q:'Flashback Database uses which logs to rewind the database?', choices:['Undo logs','Flashback logs','Redo logs','Archive logs'], ans:1, hint:'Flashback Database يعتمد على flashback logs للعودة إلى وقت سابق.'},
  {type:'tf', q:'True or False: To use Flashback Table, the user needs FLASHBACK TABLE privilege and SELECT/INSERT/DELETE/ALTER on the object.', ans:true, hint:'صحيح — يتطلب صلاحيات FLASHBACK TABLE و SELECT/INSERT/DELETE/ALTER.'},
  {type:'mcq', q:'In Flashback Transaction Query, if a DDL transaction is queried, it shows:', choices:['Space management changes in data dictionary','Row modifications only','Undo SQL for rows','Nothing, as DDL is not supported'], ans:0, hint:'Flashback Transaction Query يعرض تغييرات Data Dictionary للـ DDL.'},
  {type:'tf', q:'True or False: Undo segments automatically grow and shrink as needed.', ans:true, hint:'صحيح — Undo segments تتوسع وتقل تلقائياً حسب الحاجة.'},
  {type:'mcq', q:'Flashback Query uses the AS OF clause with:', choices:['SCN or timestamp','Transaction ID','Version between','Undo SQL'], ans:0, hint:'AS OF SCN أو timestamp لعرض البيانات في وقت سابق.'},
  {type:'tf', q:'True or False: Flashback Version Query can be used on external or temporary tables.', ans:false, hint:'خطأ — VERSIONS clause لا يعمل على external أو temporary tables.'},
  {type:'mcq', q:'To view changes made at transaction level, use:', choices:['Flashback Query','Flashback Version Query','Flashback Transaction Query','Flashback Table'], ans:2, hint:'Flashback Transaction Query لعرض التغييرات على مستوى المعاملة.'},
  {type:'tf', q:'True or False: Flashback Table operation is done in place while the database is online.', ans:true, hint:'صحيح — Flashback Table يتم أونلاين دون إغلاق قاعدة البيانات.'},
  {type:'mcq', q:'What must be enabled for Flashback Table?', choices:['Row movement','Recycle bin','Flashback logs','Undo retention guarantee'], ans:0, hint:'يجب تمكين ROW MOVEMENT على الجدول.'},
  {type:'tf', q:'True or False: In guaranteed undo retention, queries have precedence over transactions.', ans:true, hint:'صحيح — RETENTION GUARANTEE يعطي أولوية للاستعلامات على المعاملات.'},
  {type:'mcq', q:'Flashback Drop reverses DROP TABLE by using:', choices:['Undo data','Flashback logs','Recycle bin','Redo logs'], ans:2, hint:'Flashback Drop يستعيد من Recycle Bin.'},
  {type:'tf', q:'True or False: When RECYCLEBIN=ON, dropped tables are renamed with system-generated names.', ans:true, hint:'صحيح — الجداول المحذوفة تُعاد تسميتها تلقائياً في Recycle Bin.'},
  {type:'mcq', q:'To purge dropped objects from recycle bin when dropping tablespace, use:', choices:['INCLUDING CONTENTS','CASCADE','PURGE','NOGUARANTEE'], ans:0, hint:'DROP TABLESPACE INCLUDING CONTENTS يحذف من Recycle Bin.'},
  {type:'tf', q:'True or False: Flashback Database is a unique point-in-time recovery capability that rewinds the database quickly by restoring only affected data blocks.', ans:true, hint:'صحيح — Flashback Database يعيد الكتل المغيرة فقط باستخدام flashback logs.'},
  {type:'mcq', q:'Flashback Database uses which logs to record old block versions?', choices:['Redo logs','Undo logs','Flashback logs','Archive logs'], ans:2, hint:'Flashback logs تسجل الإصدارات القديمة من الكتل للـ rewind.'},
  {type:'tf', q:'True or False: Flashback logs are archived and written sequentially.', ans:false, hint:'خطأ — Flashback logs غير archived، وتُكتب sequentially في FRA.'},
  {type:'mcq', q:'The time to rewind with Flashback Database is proportional to:', choices:['Number of data files','How far back and amount of activity after target time','Size of redo logs','Number of users'], ans:1, hint:'الوقت يعتمد على البعد الزمني والنشاط بعد الوقت المستهدف.'},
  {type:'tf', q:'True or False: The RVWR process writes flashback data from buffer to logs when Flashback Database is enabled.', ans:true, hint:'صحيح — RVWR (Flashback Writer) يكتب flashback data sequentially.'},
  {type:'mcq', q:'Overhead of Flashback Database is higher in:', choices:['Read-intensive workloads','Write-intensive workloads','Idle databases','Backup operations'], ans:1, hint:'الـ overhead أعلى في write-intensive بسبب logging الـ block images.'},
  {type:'tf', q:'True or False: To enable Flashback Database, set DB_FLASHBACK_RETENTION_TARGET and ALTER DATABASE FLASHBACK ON.', ans:true, hint:'صحيح — يحتاج FRA، retention target، و ARCHIVELOG mode.'},
  {type:'mcq', q:'Flashback Database command requires the database to be in which mode?', choices:['OPEN','MOUNT exclusive','NOMOUNT','READ ONLY'], ans:1, hint:'يجب MOUNT exclusive، ثم OPEN READ ONLY للتحقق.'},
  {type:'tf', q:'True or False: Flashback Database can recover dropped data files during the flashback span.', ans:false, hint:'خطأ — لا يستعيد dropped data files؛ يُضاف offline فقط.'},
  {type:'mcq', q:'To monitor estimated space for flashback logs, use view:', choices:['V$FLASHBACK_DATABASE_LOG','V$SESSION LONGOPS','V$DATABASE','V$RECOVERY_AREA_USAGE'], ans:0, hint:'V$FLASHBACK_DATABASE_LOG يعطي ESTIMATED_FLASHBACK_SIZE.'},
  {type:'tf', q:'True or False: Guaranteed restore points ensure flashback logs are retained even if flashback logging is not enabled.', ans:true, hint:'صحيح — تضمن retention للـ SCN المحدد، ولا تُحذف تلقائياً.'},
  {type:'mcq', q:'Guaranteed restore points differ from normal ones by:', choices:['Aging out automatically','Requiring explicit drop','Not supporting SCN','Being archived'], ans:1, hint:'يجب drop صراحة، وتضمن retention للـ flashback.'}
];

  // randomize order each run
  let questions = shuffle(questionsMaster.map((q,i)=>{ q._id=i; return q; }));
  let index = 0, score = 0;
  const total = questions.length;
  const quizArea = document.getElementById('quizArea');
  const prog = document.getElementById('prog');

  function shuffle(a) { for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }

  function renderQuestion() {
    if (!quizArea) {
      console.error('quizArea element not found!');
      return;
    }
    prog.style.width = `${Math.round((index/total)*100)}%`;
    const item = questions[index];
    let html = `<div class="question">Q${index+1}. ${item.q}</div>`;
    if (item.type === 'mcq' || item.type === 'tf') {
      if (item.type === 'tf') {
        html += `<div class="choices"><div class="choice" data-i="true">True</div><div class="choice" data-i="false">False</div></div>`;
      } else {
        item._choices = shuffle(item.choices.map((c,i)=>({c,i})));
        html += `<div class="choices">${item._choices.map(ch=>`<div class="choice" data-i="${ch.i}">${ch.c}</div>`).join('')}</div>`;
      }
      html += `<div class="controls"><div class="meta">Question ${index+1} of ${total}</div><div><button id="skip">Skip</button><button class="secondary" id="showHint">Show Hint</button></div></div><div class="result" id="result"></div>`;
    } else if (item.type === 'order') {
      item._shuffled = shuffle(item.items.slice());
      html += `<div class="hint" style="font-weight:600;margin-bottom:8px">Drag items to order them correctly then press Submit.</div>`;
      html += `<ul id="ordering" class="ordering-list">${item._shuffled.map((it,idx)=>`<li draggable="true" class="ordering-item" data-pos="${idx}">${it}</li>`).join('')}</ul>`;
      html += `<div class="controls"><div class="meta">Question ${index+1} of ${total}</div><div><button id="submitOrder">Submit</button><button class="secondary" id="showHint">Show Hint</button></div></div><div class="result" id="result"></div>`;
    }
    quizArea.innerHTML = html;
    attachHandlers(item);
  }

  function attachHandlers(item) {
    if (item.type === 'mcq' || item.type === 'tf') {
      document.querySelectorAll('.choice').forEach(el => el.addEventListener('click', e => {
        const pickedRaw = e.currentTarget.dataset.i;
        const res = document.getElementById('result');
        if (!res) return;
        res.classList.add('show');
        let correct = false;
        if (item.type === 'tf') {
          const picked = (pickedRaw === 'true');
          correct = (picked === item.ans);
        } else {
          const pickedIndex = Number(pickedRaw);
          correct = (pickedIndex === item.ans);
        }
        if (correct) { res.innerHTML = `<div style="color:var(--ok);font-weight:700">Correct ✓</div><div class="hint">${item.hint}</div>`; score++; }
        else {
          if (item.type === 'mcq') {
            const correctText = item.choices[item.ans];
            res.innerHTML = `<div style="color:var(--bad);font-weight:700">Incorrect ✖ — Correct: ${correctText}</div><div class="hint">${item.hint}</div>`;
          } else {
            res.innerHTML = `<div style="color:var(--bad);font-weight:700">Incorrect ✖</div><div class="hint">${item.hint}</div>`;
          }
        }
        document.querySelectorAll('.choice').forEach(c => c.setAttribute('aria-disabled', 'true'));
      }));

      document.getElementById('skip')?.addEventListener('click', () => { next(); });
      document.getElementById('showHint')?.addEventListener('click', () => {
        const r = document.getElementById('result');
        if (r) { r.classList.add('show'); r.innerHTML = `<div class="hint">${item.hint}</div>`; }
      });
    } else if (item.type === 'order') {
      const list = document.getElementById('ordering');
      if (!list) return;
      let dragSrc = null;
      let touchStartY = 0;

      list.querySelectorAll('.ordering-item').forEach((li, idx) => {
        li.addEventListener('dragstart', e => {
          dragSrc = li;
          li.style.opacity = '0.5';
        });
        li.addEventListener('dragend', e => {
          dragSrc = null;
          li.style.opacity = '1';
        });
        li.addEventListener('dragover', e => e.preventDefault());
        li.addEventListener('drop', e => {
          e.preventDefault();
          if (dragSrc && dragSrc !== li) {
            const srcHTML = dragSrc.innerHTML;
            dragSrc.innerHTML = li.innerHTML;
            li.innerHTML = srcHTML;
          }
        });

        li.addEventListener('touchstart', e => {
          touchStartY = e.touches[0].clientY;
          dragSrc = li;
          li.style.opacity = '0.5';
        });

        li.addEventListener('touchmove', e => {
          const touchY = e.touches[0].clientY;
          const deltaY = touchY - touchStartY;
          if (Math.abs(deltaY) > 10) {
            const siblings = Array.from(list.children);
            const currentIndex = siblings.indexOf(li);
            let targetIndex = currentIndex;
            if (deltaY > 0 && currentIndex < siblings.length - 1) targetIndex++;
            else if (deltaY < 0 && currentIndex > 0) targetIndex--;
            if (targetIndex !== currentIndex) {
              const target = siblings[targetIndex];
              const srcHTML = li.innerHTML;
              li.innerHTML = target.innerHTML;
              target.innerHTML = srcHTML;
              touchStartY = touchY;
            }
          }
        });

        li.addEventListener('touchend', e => {
          dragSrc = null;
          li.style.opacity = '1';
        });
      });

      document.getElementById('submitOrder')?.addEventListener('click', () => {
        const arranged = Array.from(list.children).map(li => li.textContent.trim());
        const correctSeq = item.solution.map(i => item.items[i]);
        const res = document.getElementById('result');
        if (!res) return;
        res.classList.add('show');
        const ok = arranged.every((v, i) => v === correctSeq[i]);
        if (ok) { res.innerHTML = `<div style="color:var(--ok);font-weight:700">Correct order ✓</div><div class="hint">${item.hint}</div>`; score++; }
        else { res.innerHTML = `<div style="color:var(--bad);font-weight:700">Incorrect order ✖</div><div style="color:var(--muted);margin-top:6px">Correct order:</div><ol style="color:var(--muted)">${correctSeq.map(s => `<li>${s}</li>`).join('')}</ol><div class="hint">${item.hint}</div>`; }
      });

      document.getElementById('showHint')?.addEventListener('click', () => {
        const r = document.getElementById('result');
        if (r) { r.classList.add('show'); r.innerHTML = `<div class="hint">${item.hint}</div>`; }
      });
    }
  }

  function next() {
    index++;
    if (index < total) renderQuestion();
    else finishQuiz();
  }

  function finishQuiz() {
    clearInterval(timerInterval);
    document.getElementById('quizArea').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('reviewBtn').style.display = 'inline-block';
    document.getElementById('retryBtn').style.display = 'inline-block';
    document.getElementById('final').style.display = 'block';
    document.getElementById('scoreText').textContent = `Your score: ${score} / ${total}`;
    const msg = score === total ? 'Perfect!' : (score >= Math.ceil(total * 0.7) ? 'Pass' : 'Needs Practice');
    document.getElementById('scoreMsg').textContent = msg;
    prog.style.width = '100%';
  }

  function review() {
    const html = questions.map((q, i) => {
      let out = `<div style="margin-bottom:12px"><div style="font-weight:700">Q${i+1}. ${q.q}</div>`;
      if (q.type === 'mcq') { out += `<div style="color:var(--muted)">Answer: ${q.choices[q.ans]}</div>`; }
      else if (q.type === 'tf') { out += `<div style="color:var(--muted)">Answer: ${q.ans ? 'True' : 'False'}</div>`; }
      else { const correctSeq = q.solution.map(idx => q.items[idx]); out += `<div style="color:var(--muted)">Correct order: <ol>${correctSeq.map(s => `<li>${s}</li>`).join('')}</ol></div>`; }
      out += `<div style="color:var(--muted);margin-top:6px">Hint (AR): ${q.hint}</div></div>`;
      return out;
    }).join('');
    quizArea.innerHTML = `<div style="max-height:60vh;overflow:auto;padding-right:6px">${html}<div style="text-align:center"><button id="backBtn">Back</button></div></div>`;
    document.getElementById('backBtn').addEventListener('click', () => { location.reload(); });
  }

  // buttons
  document.getElementById('nextBtn').addEventListener('click', () => { next(); });
  document.getElementById('reviewBtn').addEventListener('click', () => { review(); });
  document.getElementById('retryBtn').addEventListener('click', () => { location.reload(); });

  // Ensure DOM is fully loaded before starting
  document.addEventListener('DOMContentLoaded', () => {
    startTimer();
    renderQuestion();
  });


