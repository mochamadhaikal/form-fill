Router.post('/users', async function(req, res, next) {
   const pdfDoc = await PDFDocument.load(await readFile(`${__dirname}/../pdf/form.pdf`))

   pdfDoc.removePage(0)
   pdfDoc.removePage(0)
   pdfDoc.removePage(3)

   const form = pdfDoc.getForm()

   req.body.data.aof.map((data, i) => {
      //  AVA Asian Opportunities Fund
      form.getTextField(`aof_tgl_transaksi_${i}`).setText(data.tgl_transaksi)
      form.getTextField(`aof_jenis_transaksi_${i}`).setText(data.jenis_transaksi)
      form.getTextField(`aof_jumlah_nominal_${i}`).setText(data.jumlah_nominal)
      form.getTextField(`aof_harga_unit_${i}`).setText(`(${data.harga_unit})`)
      form.getTextField(`aof_jumlah_unit_${i}`).setText(data.jumlah_unit)
      form.getTextField(`aof_total_akumulasi_unit_${i}`).setText(`(${data.akumulasi_unit})`)
   })

   req.body.data.fipf.map((data, i) => {
      // AVA Fixed Income Plus Fund
      form.getTextField(`fipf_tgl_transaksi_${i}`).setText(data.tgl_transaksi)
      form.getTextField(`fipf_jenis_transaksi_${i}`).setText(data.jenis_transaksi)
      form.getTextField(`fipf_jumlah_nominal_${i}`).setText(data.jumlah_nominal)
      form.getTextField(`fipf_harga_unit_${i}`).setText(`(${data.harga_unit})`)
      form.getTextField(`fipf_jumlah_unit_${i}`).setText(data.jumlah_unit)
      form.getTextField(`fipf_total_akumulasi_unit_${i}`).setText(`(${data.akumulasi_unit})`)
   })

   req.body.data.gpf.map((data, i) => {
      //  AVA Growth Plus Fund
      form.getTextField(`gpf_tgl_transaksi_${i}`).setText(data.tgl_transaksi)
      form.getTextField(`gpf_jenis_transaksi_${i}`).setText(data.jenis_transaksi)
      form.getTextField(`gpf_jumlah_nominal_${i}`).setText(data.jumlah_nominal)
      form.getTextField(`gpf_harga_unit_${i}`).setText(`(${data.harga_unit})`)
      form.getTextField(`gpf_jumlah_unit_${i}`).setText(data.jumlah_unit)
      form.getTextField(`gpf_total_akumulasi_unit_${i}`).setText(`(${data.akumulasi_unit})`)
   })

   req.body.data.scef.map((data, i) => {
      //  AVA Small Cap Equity Fund
      form.getTextField(`scef_tgl_transaksi_${i}`).setText(data.tgl_transaksi)
      form.getTextField(`scef_jenis_transaksi_${i}`).setText(data.jenis_transaksi)
      form.getTextField(`scef_jumlah_nominal_${i}`).setText(data.jumlah_nominal)
      form.getTextField(`scef_harga_unit_${i}`).setText(`(${data.harga_unit})`)
      form.getTextField(`scef_jumlah_unit_${i}`).setText(data.jumlah_unit)
      form.getTextField(`scef_total_akumulasi_unit_${i}`).setText(`(${data.akumulasi_unit})`)
   })

   req.body.data.sf.map((data, i) => {
      //  AVA Secure Fund
      form.getTextField(`sf_tgl_transaksi_${i}`).setText(data.tgl_transaksi)
      form.getTextField(`sf_jenis_transaksi_${i}`).setText(data.jenis_transaksi)
      form.getTextField(`sf_jumlah_nominal_${i}`).setText(data.jumlah_nominal)
      form.getTextField(`sf_harga_unit_${i}`).setText(`(${data.harga_unit})`)
      form.getTextField(`sf_jumlah_unit_${i}`).setText(data.jumlah_unit)
      form.getTextField(`sf_total_akumulasi_unit_${i}`).setText(`(${data.akumulasi_unit})`)
   })

   const ringkasan = req.body.ringkasan;

      form.getTextField(`aof_saldo_akhir`).setText(`${ringkasan.aof_saldo_akhir}`)
      form.getTextField(`aof_harga_unit`).setText(`${ringkasan.aof_harga_unit}`)
      form.getTextField(`aof_nilai_dana`).setText(`${ringkasan.aof_nilai_dana}`)
      form.getTextField(`fipf_saldo_akhir`).setText(`${ringkasan.fipf_saldo_akhir}`)
      form.getTextField(`fipf_harga_unit`).setText(`${ringkasan.fipf_harga_unit}`)
      form.getTextField(`fipf_nilai_dana`).setText(`${ringkasan.fipf_nilai_dana}`)
      form.getTextField(`gpf_saldo_akhir`).setText(`${ringkasan.gpf_saldo_akhir}`)
      form.getTextField(`gpf_harga_unit`).setText(`${ringkasan.gpf_harga_unit}`)
      form.getTextField(`gpf_nilai_dana`).setText(`${ringkasan.gpf_nilai_dana}`)
      form.getTextField(`scef_saldo_akhir`).setText(`${ringkasan.scef_saldo_akhir}`)
      form.getTextField(`scef_harga_unit`).setText(`${ringkasan.scef_harga_unit}`)
      form.getTextField(`scef_nilai_dana`).setText(`${ringkasan.scef_nilai_dana}`)
      form.getTextField(`sf_saldo_akhir`).setText(`${ringkasan.sf_saldo_akhir}`)
      form.getTextField(`sf_harga_unit`).setText(`${ringkasan.sf_harga_unit}`)
      form.getTextField(`sf_nilai_dana`).setText(`${ringkasan.sf_nilai_dana}`)

      form.getTextField(`total_dana`).setText(`
      ${
         ringkasan.aof_nilai_dana +
         ringkasan.fipf_nilai_dana +
         ringkasan.gpf_nilai_dana +
         ringkasan.scef_nilai_dana +
         ringkasan.sf_nilai_dana
      }`)

   form.flatten()

   const pdfBtyes = await pdfDoc.save()
   await writeFile(`${__dirname}/../pdf/coba1.pdf`, pdfBtyes)

   users.push(req.body)
   res.status(200).send(req.body)
})

// Router.get('/users/:id', async function(req, res, next) {
//    const id = req.params.id
//    const data = users.filter((user) => {
//       return user.id == id
//    })
//    const pdfDoc = await PDFDocument.load(await readFile(`${__dirname}/../pdf/form.pdf`))

//    pdfDoc.removePage(0)
//    pdfDoc.removePage(0)
//    pdfDoc.removePage(3)

//    const form = pdfDoc.getForm()

//    users.data.aof.map((data, i) => {
//       //  AVA Asian Opportunities Fund
//       form.getTextField(`aof_tgl_transaksi_${i}`).setText(data.tgl_transaksi)
//       form.getTextField(`aof_jenis_transaksi_${i}`).setText(data.jenis_transaksi)
//       form.getTextField(`aof_jumlah_nominal_${i}`).setText(data.jumlah_nominal)
//       form.getTextField(`aof_harga_unit_${i}`).setText(`(${data.harga_unit})`)
//       form.getTextField(`aof_jumlah_unit_${i}`).setText(data.jumlah_unit)
//       form.getTextField(`aof_total_akumulasi_unit_${i}`).setText(`(${data.akumulasi_unit})`)
//    })

//    users.data.fipf.map((data, i) => {
//       // AVA Fixed Income Plus Fund
//       form.getTextField(`fipf_tgl_transaksi_${i}`).setText(data.tgl_transaksi)
//       form.getTextField(`fipf_jenis_transaksi_${i}`).setText(data.jenis_transaksi)
//       form.getTextField(`fipf_jumlah_nominal_${i}`).setText(data.jumlah_nominal)
//       form.getTextField(`fipf_harga_unit_${i}`).setText(`(${data.harga_unit})`)
//       form.getTextField(`fipf_jumlah_unit_${i}`).setText(data.jumlah_unit)
//       form.getTextField(`fipf_total_akumulasi_unit_${i}`).setText(`(${data.akumulasi_unit})`)
//    })

//    users.data.gpf.map((data, i) => {
//       //  AVA Growth Plus Fund
//       form.getTextField(`gpf_tgl_transaksi_${i}`).setText(data.tgl_transaksi)
//       form.getTextField(`gpf_jenis_transaksi_${i}`).setText(data.jenis_transaksi)
//       form.getTextField(`gpf_jumlah_nominal_${i}`).setText(data.jumlah_nominal)
//       form.getTextField(`gpf_harga_unit_${i}`).setText(`(${data.harga_unit})`)
//       form.getTextField(`gpf_jumlah_unit_${i}`).setText(data.jumlah_unit)
//       form.getTextField(`gpf_total_akumulasi_unit_${i}`).setText(`(${data.akumulasi_unit})`)
//    })

//    users.data.scef.map((data, i) => {
//       //  AVA Small Cap Equity Fund
//       form.getTextField(`scef_tgl_transaksi_${i}`).setText(data.tgl_transaksi)
//       form.getTextField(`scef_jenis_transaksi_${i}`).setText(data.jenis_transaksi)
//       form.getTextField(`scef_jumlah_nominal_${i}`).setText(data.jumlah_nominal)
//       form.getTextField(`scef_harga_unit_${i}`).setText(`(${data.harga_unit})`)
//       form.getTextField(`scef_jumlah_unit_${i}`).setText(data.jumlah_unit)
//       form.getTextField(`scef_total_akumulasi_unit_${i}`).setText(`(${data.akumulasi_unit})`)
//    })

//    users.data.sf.map((data, i) => {
//       //  AVA Secure Fund
//       form.getTextField(`sf_tgl_transaksi_${i}`).setText(data.tgl_transaksi)
//       form.getTextField(`sf_jenis_transaksi_${i}`).setText(data.jenis_transaksi)
//       form.getTextField(`sf_jumlah_nominal_${i}`).setText(data.jumlah_nominal)
//       form.getTextField(`sf_harga_unit_${i}`).setText(`(${data.harga_unit})`)
//       form.getTextField(`sf_jumlah_unit_${i}`).setText(data.jumlah_unit)
//       form.getTextField(`sf_total_akumulasi_unit_${i}`).setText(`(${data.akumulasi_unit})`)
//    })

//    const ringkasan = users.data.ringkasan;

//       form.getTextField(`aof_saldo_akhir`).setText(`${ringkasan.aof_saldo_akhir}`)
//       form.getTextField(`aof_harga_unit`).setText(`${ringkasan.aof_harga_unit}`)
//       form.getTextField(`aof_nilai_dana`).setText(`${ringkasan.aof_nilai_dana}`)
//       form.getTextField(`fipf_saldo_akhir`).setText(`${ringkasan.fipf_saldo_akhir}`)
//       form.getTextField(`fipf_harga_unit`).setText(`${ringkasan.fipf_harga_unit}`)
//       form.getTextField(`fipf_nilai_dana`).setText(`${ringkasan.fipf_nilai_dana}`)
//       form.getTextField(`gpf_saldo_akhir`).setText(`${ringkasan.gpf_saldo_akhir}`)
//       form.getTextField(`gpf_harga_unit`).setText(`${ringkasan.gpf_harga_unit}`)
//       form.getTextField(`gpf_nilai_dana`).setText(`${ringkasan.gpf_nilai_dana}`)
//       form.getTextField(`scef_saldo_akhir`).setText(`${ringkasan.scef_saldo_akhir}`)
//       form.getTextField(`scef_harga_unit`).setText(`${ringkasan.scef_harga_unit}`)
//       form.getTextField(`scef_nilai_dana`).setText(`${ringkasan.scef_nilai_dana}`)
//       form.getTextField(`sf_saldo_akhir`).setText(`${ringkasan.sf_saldo_akhir}`)
//       form.getTextField(`sf_harga_unit`).setText(`${ringkasan.sf_harga_unit}`)
//       form.getTextField(`sf_nilai_dana`).setText(`${ringkasan.sf_nilai_dana}`)

//       form.getTextField(`total_dana`).setText(`
//       ${
//          ringkasan.aof_nilai_dana +
//          ringkasan.fipf_nilai_dana +
//          ringkasan.gpf_nilai_dana +
//          ringkasan.scef_nilai_dana +
//          ringkasan.sf_nilai_dana
//       }`)

//    form.flatten()

//    const pdfBtyes = await pdfDoc.save()
//    await writeFile(`${__dirname}/../pdf/coba1.pdf`, pdfBtyes)
//    // console.log(data.id);

//    res.status(200).send(data)
// })

Router.get('/users/:id', async function(req, res, next) {
   try {
      const id = req.params.id;
      const data = users.filter((user, i) => {
         return user.id == id;
      })
      
      res.status(200).send(data[0].ringkasan)
   } catch (error) {
      console.log(error);
   }
})