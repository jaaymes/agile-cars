if(!self.define){let s,e={};const a=(a,i)=>(a=new URL(a+".js",i).href,e[a]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=a,s.onload=e,document.head.appendChild(s)}else s=a,importScripts(a),e()})).then((()=>{let s=e[a];if(!s)throw new Error(`Module ${a} didn’t register its module`);return s})));self.define=(i,c)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let r={};const o=s=>a(s,n),t={module:{uri:n},exports:r,require:o};e[n]=Promise.all(i.map((s=>t[s]||o(s)))).then((s=>(c(...s),r)))}}define(["./workbox-588899ac"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/static/chunks/0c428ae2-94eaf6d350ca8424.js",revision:"94eaf6d350ca8424"},{url:"/_next/static/chunks/167.9f838dd416884fe8.js",revision:"9f838dd416884fe8"},{url:"/_next/static/chunks/252f366e-ccc69cab34d3e5ce.js",revision:"ccc69cab34d3e5ce"},{url:"/_next/static/chunks/61-3ab49dbe44e9d4c6.js",revision:"3ab49dbe44e9d4c6"},{url:"/_next/static/chunks/73-b2943c795833826a.js",revision:"b2943c795833826a"},{url:"/_next/static/chunks/740-f201a39a255a017b.js",revision:"f201a39a255a017b"},{url:"/_next/static/chunks/754.e41dad4b3e87b2ae.js",revision:"e41dad4b3e87b2ae"},{url:"/_next/static/chunks/78e521c3-175a428dbdba24c6.js",revision:"175a428dbdba24c6"},{url:"/_next/static/chunks/79-38c796b2b85adab4.js",revision:"38c796b2b85adab4"},{url:"/_next/static/chunks/830-c825b568d40cb4bf.js",revision:"c825b568d40cb4bf"},{url:"/_next/static/chunks/859-ec846cea2c742c5f.js",revision:"ec846cea2c742c5f"},{url:"/_next/static/chunks/948-3e009fc8055a78a7.js",revision:"3e009fc8055a78a7"},{url:"/_next/static/chunks/982.0c36aadc10720d31.js",revision:"0c36aadc10720d31"},{url:"/_next/static/chunks/ae51ba48-2039e0fe378df2fd.js",revision:"2039e0fe378df2fd"},{url:"/_next/static/chunks/eabe11fc.f917b206f0d5fe8c.js",revision:"f917b206f0d5fe8c"},{url:"/_next/static/chunks/framework-b3802df6cb251587.js",revision:"b3802df6cb251587"},{url:"/_next/static/chunks/main-41db8ecfe3fbb50f.js",revision:"41db8ecfe3fbb50f"},{url:"/_next/static/chunks/pages/_app-03e61558b2e05b98.js",revision:"03e61558b2e05b98"},{url:"/_next/static/chunks/pages/_error-a51993fe870ec2c8.js",revision:"a51993fe870ec2c8"},{url:"/_next/static/chunks/pages/admin-88e72d6e1bfe679e.js",revision:"88e72d6e1bfe679e"},{url:"/_next/static/chunks/pages/index-ab4a56f2dbf28cf9.js",revision:"ab4a56f2dbf28cf9"},{url:"/_next/static/chunks/pages/shop-bc8c6ecedc84349b.js",revision:"bc8c6ecedc84349b"},{url:"/_next/static/chunks/pages/shop/veiculo-bed0586f7f713540.js",revision:"bed0586f7f713540"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-0b46d528171f905c.js",revision:"0b46d528171f905c"},{url:"/_next/static/css/b439f50041f56dcc.css",revision:"b439f50041f56dcc"},{url:"/_next/static/css/fec95abf28dff384.css",revision:"fec95abf28dff384"},{url:"/_next/static/media/ajax-loader.0b80f665.gif",revision:"0b80f665"},{url:"/_next/static/media/slick.25572f22.eot",revision:"25572f22"},{url:"/_next/static/media/slick.653a4cbb.woff",revision:"653a4cbb"},{url:"/_next/static/media/slick.6aa1ee46.ttf",revision:"6aa1ee46"},{url:"/_next/static/media/slick.f895cfdf.svg",revision:"f895cfdf"},{url:"/_next/static/vVCEBWKtRT8KulJ3r2wdO/_buildManifest.js",revision:"58a2f5bb7eb1a0e6f7f2387a4c5023ca"},{url:"/_next/static/vVCEBWKtRT8KulJ3r2wdO/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/android-chrome-192x192.png",revision:"1a8869c9390d37346007a83e391f2b1f"},{url:"/android-chrome-512x512.png",revision:"351fea8a11d4370dd3248c2ad5a5e2bf"},{url:"/apple-touch-icon.png",revision:"b30d863f31d98dae371fc88240121ddf"},{url:"/assets/background/overlay_1.svg",revision:"8a76136366260a561586b3b792e9ed9b"},{url:"/assets/background/overlay_2.jpg",revision:"b5f593c89f21e0f0305c4c64e662ad30"},{url:"/assets/background/overlay_3.jpg",revision:"312213fd5c864413eace0afb7ecc76c6"},{url:"/assets/background/overlay_4.jpg",revision:"cf8ee36429cbe16227fd7635165ab332"},{url:"/assets/icons/apps/ic_chrome.svg",revision:"3e6b012103d101c69ede31e6eff216d6"},{url:"/assets/icons/apps/ic_drive.svg",revision:"ad53f6fe61010d501938788843f836b4"},{url:"/assets/icons/apps/ic_dropbox.svg",revision:"baead2d1b620c7ce94f2ad6308706f4d"},{url:"/assets/icons/apps/ic_evernote.svg",revision:"f6c73c74a23281ff3b2bcb957e3d924f"},{url:"/assets/icons/apps/ic_github.svg",revision:"768ef1c35fe7c5fe6edab4343f114fcc"},{url:"/assets/icons/apps/ic_onedrive.svg",revision:"6cb5d2b0da0789914d430a05d99be6fe"},{url:"/assets/icons/auth/ic_auth0.png",revision:"c4b04fc50a48a05f80d069dd318b6416"},{url:"/assets/icons/auth/ic_cognito.png",revision:"1ea21bc39db9826ecf1e7c51e5b7cdc3"},{url:"/assets/icons/auth/ic_firebase.png",revision:"414c3389ac37629c0a353f518d35e1d9"},{url:"/assets/icons/auth/ic_jwt.png",revision:"101f021f6f9adc424edc28401be20891"},{url:"/assets/icons/brands/ic_brand_amazon.svg",revision:"5d9dd9aab2ba3c68d1690879ff164a8b"},{url:"/assets/icons/brands/ic_brand_hbo.svg",revision:"0d5d072ef825b7959b938dc2a8256102"},{url:"/assets/icons/brands/ic_brand_ibm.svg",revision:"34a4ba4299c1a4e5e5038389cd821a5f"},{url:"/assets/icons/brands/ic_brand_lya.svg",revision:"c412d645b6963c81698e2f7ab1d451d4"},{url:"/assets/icons/brands/ic_brand_netflix.svg",revision:"5cc4d796ef2b4b1f13c7ea3284f0054a"},{url:"/assets/icons/brands/ic_brand_spotify.svg",revision:"853b8f210dc53f1dc24aa5affed9ddc7"},{url:"/assets/icons/components/ic_accordion.png",revision:"772b84e7dc824873792c7ecfb71cec5c"},{url:"/assets/icons/components/ic_alert.png",revision:"40ac262df4c16f4cb582a255d288c764"},{url:"/assets/icons/components/ic_autocomplete.png",revision:"acd5b1ad7bb4291963209a0af57f1b9d"},{url:"/assets/icons/components/ic_avatar.png",revision:"fa3a940da0fa9b06058cd3abf9e38669"},{url:"/assets/icons/components/ic_badge.png",revision:"e2c49fe4e28b2d29a8e18aea6fabc2a8"},{url:"/assets/icons/components/ic_breadcrumbs.png",revision:"5a3efd7b0c82d937d703ac65bb4d6833"},{url:"/assets/icons/components/ic_buttons.png",revision:"3e2f0dbc871a497b944307312ffb3449"},{url:"/assets/icons/components/ic_checkbox.png",revision:"58bbfeb2b28434537056129283b63bc1"},{url:"/assets/icons/components/ic_chip.png",revision:"eb5517304a326d6a402e8abbc4d9c480"},{url:"/assets/icons/components/ic_colors.png",revision:"a1a494a9c402447d789645eefa36c317"},{url:"/assets/icons/components/ic_data_grid.png",revision:"1fc9058b1eccb5837b30887c4ceaa0d2"},{url:"/assets/icons/components/ic_dialog.png",revision:"d57f8f1f3820011656c765352e07f737"},{url:"/assets/icons/components/ic_extra_animate.png",revision:"502b661115417f18068fa828d657705a"},{url:"/assets/icons/components/ic_extra_carousel.png",revision:"5536051f8c4a7c34b8eb4416dac55dbe"},{url:"/assets/icons/components/ic_extra_chart.png",revision:"751dacfba24f170062119389218cf7a8"},{url:"/assets/icons/components/ic_extra_copy_to_clipboard.png",revision:"27c692a725cfbeb4edc08a6e724ed79c"},{url:"/assets/icons/components/ic_extra_editor.png",revision:"f996ff1f01065f61011cd40bed4bbfac"},{url:"/assets/icons/components/ic_extra_form_validation.png",revision:"fb4f73a8c9769eb8dcd368a5245c9ac7"},{url:"/assets/icons/components/ic_extra_image.png",revision:"a4422bff928efe532ce70b45d235d96c"},{url:"/assets/icons/components/ic_extra_label.png",revision:"87eb083aa7e9ffce09b596e978f02ebd"},{url:"/assets/icons/components/ic_extra_lightbox.png",revision:"d81c8b728262a9fbd77d24cf66278b75"},{url:"/assets/icons/components/ic_extra_map.png",revision:"218d75a3d19a7586627d849e1e45bd59"},{url:"/assets/icons/components/ic_extra_mega_menu.png",revision:"55e8c6519827cfc0845b4605c189ff89"},{url:"/assets/icons/components/ic_extra_multi_language.png",revision:"0d7608f95d453142503fa52bd7c04ff0"},{url:"/assets/icons/components/ic_extra_navigation_bar.png",revision:"15aec1fb47d49c3852134d6382378c2d"},{url:"/assets/icons/components/ic_extra_organization_chart.png",revision:"33ac14174afaa5d70be80d29b22da882"},{url:"/assets/icons/components/ic_extra_scroll.png",revision:"572bcf10f8130fbfb202076fbdc89110"},{url:"/assets/icons/components/ic_extra_snackbar.png",revision:"c3cd906dff6f4a24b69138d3a82ff9de"},{url:"/assets/icons/components/ic_extra_text_max_line.png",revision:"71f4d31e4d8f2443589752ee9a0d620f"},{url:"/assets/icons/components/ic_extra_upload.png",revision:"222528556beb5048b9aef763dc79c2d8"},{url:"/assets/icons/components/ic_grid.png",revision:"3845e59b024541d245950d2415fe1273"},{url:"/assets/icons/components/ic_icons.png",revision:"72af72540ff321b49cb5d68801ac69c6"},{url:"/assets/icons/components/ic_list.png",revision:"a213df88c54bfcb23588f371a2a4e481"},{url:"/assets/icons/components/ic_menu.png",revision:"f76e99e77b9e12fdd57c1d2deddb7b7a"},{url:"/assets/icons/components/ic_pagination.png",revision:"9c16434c8e5b9174fd146ebfcc597bea"},{url:"/assets/icons/components/ic_pickers.png",revision:"47867daf38e9000798adb3a011412c54"},{url:"/assets/icons/components/ic_popover.png",revision:"ccd27943f612e7f01db22342a4a1c32a"},{url:"/assets/icons/components/ic_progress.png",revision:"b288a7f4ee3c4871d9b366c6b994adcf"},{url:"/assets/icons/components/ic_radio_button.png",revision:"24874097d5ec6139b419aadbf4f5ec5c"},{url:"/assets/icons/components/ic_rating.png",revision:"62f627d1cacc522a9b6148fbf1548444"},{url:"/assets/icons/components/ic_shadows.png",revision:"72b17aacfc166909bd9bf7d535899b0d"},{url:"/assets/icons/components/ic_slider.png",revision:"5a0960baf237ca73e172d093073b9cfb"},{url:"/assets/icons/components/ic_stepper.png",revision:"32b87eda1672d7c46c15ea792ddb6d66"},{url:"/assets/icons/components/ic_switch.png",revision:"36c6600cb3a0f784c0a6f3ff5199288a"},{url:"/assets/icons/components/ic_table.png",revision:"821a4b1bf356f3bce14a6b1930b5ebed"},{url:"/assets/icons/components/ic_tabs.png",revision:"00db38ebdf949a189efbfed89fe805c1"},{url:"/assets/icons/components/ic_textfield.png",revision:"62abead20bdc171dae04f974ebab6058"},{url:"/assets/icons/components/ic_timeline.png",revision:"15fe85737bf10164ab34eec14ea00380"},{url:"/assets/icons/components/ic_tooltip.png",revision:"1cb881d0b2fab6dfc5119996c811ecd1"},{url:"/assets/icons/components/ic_transfer_list.png",revision:"e21552ea3d880832b34ded4e2b2d2482"},{url:"/assets/icons/components/ic_tree_view.png",revision:"4a2ebf1b4e6a1542aa4b4b7c8a6ae82f"},{url:"/assets/icons/components/ic_typography.png",revision:"ee8f1e84295e75f0c5a733976aea6a39"},{url:"/assets/icons/faqs/ic_account.svg",revision:"0a23ab48246c65c59a43029906a1a8ea"},{url:"/assets/icons/faqs/ic_assurances.svg",revision:"a24e121c78a653bfb17c059efa0eeff6"},{url:"/assets/icons/faqs/ic_delivery.svg",revision:"2a1f50352b641d5ee034a8b0b4bb71f6"},{url:"/assets/icons/faqs/ic_package.svg",revision:"fa3a082dfe898b4af7a3c062e5bb4f7d"},{url:"/assets/icons/faqs/ic_payment.svg",revision:"d2e7fdb721aeb17a796b4b38a64c8a35"},{url:"/assets/icons/faqs/ic_refund.svg",revision:"e574e69569c3d6ecd2f0ecdbd1e5140e"},{url:"/assets/icons/files/ic_ai.svg",revision:"0366f2fc971f39ba4e4f03a729c15668"},{url:"/assets/icons/files/ic_audio.svg",revision:"58110fbe6b682f9bd997e1a9f854ac7e"},{url:"/assets/icons/files/ic_document.svg",revision:"a663b856aa515f975a69e549cf248b79"},{url:"/assets/icons/files/ic_excel.svg",revision:"62ad8bd666f8513a5518f268d29637c9"},{url:"/assets/icons/files/ic_file.svg",revision:"802093925a5b9141c4e89ea4b58fdf02"},{url:"/assets/icons/files/ic_folder.svg",revision:"32326ae8e96a38ccd5e8a943638d5290"},{url:"/assets/icons/files/ic_img.svg",revision:"4bce44d628359226ad8ae821addfc1db"},{url:"/assets/icons/files/ic_js.svg",revision:"22dfb9e46ec862daf6ba2dbdba0fecd3"},{url:"/assets/icons/files/ic_pdf.svg",revision:"6216fac05649dedbd7df04bc6537b045"},{url:"/assets/icons/files/ic_power_point.svg",revision:"537472a88432bf6f6138d75643141d4e"},{url:"/assets/icons/files/ic_pts.svg",revision:"ceb9dbe13d0542e28985fe9c1482a537"},{url:"/assets/icons/files/ic_txt.svg",revision:"fbdb47957d0a3a9747f4350f52706666"},{url:"/assets/icons/files/ic_video.svg",revision:"dfbb2cd3d26097ff2752e70e2f918c31"},{url:"/assets/icons/files/ic_word.svg",revision:"7595f9ff80715f99b97f1765b1bcf00a"},{url:"/assets/icons/files/ic_zip.svg",revision:"c9f2556df8d28ea8f38be48476479d09"},{url:"/assets/icons/flags/ic_flag_cn.svg",revision:"06f74a7214c9df3ab2f764c33c07a0f1"},{url:"/assets/icons/flags/ic_flag_de.svg",revision:"cea3d3bb15f98a65578f0b7bffa937a3"},{url:"/assets/icons/flags/ic_flag_en.svg",revision:"b751b213de4b2f6a976235b1a4b40af5"},{url:"/assets/icons/flags/ic_flag_fr.svg",revision:"88d3d5b3229841eb37a3a640e4ea0f83"},{url:"/assets/icons/flags/ic_flag_kr.svg",revision:"b533b0211adad69a36d40aed6d4b5133"},{url:"/assets/icons/flags/ic_flag_sa.svg",revision:"d6d4485566dc107e9c5f1516ce895dcb"},{url:"/assets/icons/flags/ic_flag_us.svg",revision:"c1313333c0a1f9800a7e6b37475ff310"},{url:"/assets/icons/flags/ic_flag_vn.svg",revision:"be7fd20fa3d5be23b67f42335119a4a3"},{url:"/assets/icons/home/ic_design.svg",revision:"e5c91637f21e86fa1ec347ccdd8f22a5"},{url:"/assets/icons/home/ic_development.svg",revision:"647d63a111c5213d5057405b91a38db2"},{url:"/assets/icons/home/ic_make_brand.svg",revision:"210855f21e3056b2d25629533c03a90c"},{url:"/assets/icons/navbar/ic_analytics.svg",revision:"8c28e036fe1348333175d083ef79c84b"},{url:"/assets/icons/navbar/ic_banking.svg",revision:"bed22e3f1cd5b2c6ecb84f4c5aa49348"},{url:"/assets/icons/navbar/ic_blank.svg",revision:"cb06dd886f3928d6f7d0546ea38666f9"},{url:"/assets/icons/navbar/ic_blog.svg",revision:"68969307ce99fcaf8f505491453e59da"},{url:"/assets/icons/navbar/ic_booking.svg",revision:"2423ee776ee65f3230528b8946e36826"},{url:"/assets/icons/navbar/ic_calendar.svg",revision:"3e74b4856802a4f589275887d7c823a8"},{url:"/assets/icons/navbar/ic_cart.svg",revision:"82b4dbae18f77d13b453d19ee2c8b339"},{url:"/assets/icons/navbar/ic_chat.svg",revision:"ddae5f62576b82f877418bd29e94389f"},{url:"/assets/icons/navbar/ic_dashboard.svg",revision:"8762a63646aed8877395cd983f0919fa"},{url:"/assets/icons/navbar/ic_disabled.svg",revision:"b3462963dce814723ca39deb6e13ec9f"},{url:"/assets/icons/navbar/ic_ecommerce.svg",revision:"999b23d754aec9b6b68de99e8a240a96"},{url:"/assets/icons/navbar/ic_external.svg",revision:"0fca179500c6db5702414468d7250aca"},{url:"/assets/icons/navbar/ic_file.svg",revision:"6fccae2e600fc985b8e83a7ad9738604"},{url:"/assets/icons/navbar/ic_folder.svg",revision:"054eead289bb722e4c384adf08619754"},{url:"/assets/icons/navbar/ic_invoice.svg",revision:"c0a85714da8e9022963060856b555911"},{url:"/assets/icons/navbar/ic_kanban.svg",revision:"ddc1c1afccb67b1a7f42e61cfd78bc0a"},{url:"/assets/icons/navbar/ic_label.svg",revision:"b57c99ea3ceaf957af64f0d9ed55eb99"},{url:"/assets/icons/navbar/ic_lock.svg",revision:"41cfc253a2b81965b9c4a40ab0b91edf"},{url:"/assets/icons/navbar/ic_mail.svg",revision:"eee51ef93efe4b676790464a9441802c"},{url:"/assets/icons/navbar/ic_menu_item.svg",revision:"f0958358ad816fe4dd8f8c7eaa54cf78"},{url:"/assets/icons/navbar/ic_user.svg",revision:"8f4ec08cfce2b6ea37815262216acfc7"},{url:"/assets/icons/notification/ic_chat.svg",revision:"1e724bab738446492cefff1869d2a370"},{url:"/assets/icons/notification/ic_mail.svg",revision:"aba056aee2523e3ea64d6d71a2f8e115"},{url:"/assets/icons/notification/ic_package.svg",revision:"27bf8c7fa0413003afa473721f10bdcc"},{url:"/assets/icons/notification/ic_shipping.svg",revision:"1f702c80ee6f5c66ae986296f1fefe35"},{url:"/assets/icons/payments/ic_mastercard.svg",revision:"f1b0dc15cf7707b5bbce6d86638704ba"},{url:"/assets/icons/payments/ic_paypal.svg",revision:"f4e2641720d5bc1db91ca99db70762e4"},{url:"/assets/icons/payments/ic_visa.svg",revision:"76ac8810e9787ed76eeec3c0df36973a"},{url:"/assets/icons/platforms/ic_figma.svg",revision:"75312a589b9296e25851f7ea19c276c8"},{url:"/assets/icons/platforms/ic_js.svg",revision:"a24d36f8d475a4aa2d0b8ad6960b3c90"},{url:"/assets/icons/platforms/ic_nextjs.svg",revision:"add624c2369dd2fbce51021a2ca84f33"},{url:"/assets/icons/platforms/ic_sketch.svg",revision:"f64696197a49b738e5d21096771b4976"},{url:"/assets/icons/platforms/ic_ts.svg",revision:"54e8d0bdcc5efe24ac70b9190c203118"},{url:"/assets/icons/setting/ic_align_left.svg",revision:"fabce88aa77f7d4115f3253da0a09573"},{url:"/assets/icons/setting/ic_align_right.svg",revision:"56f8e77b7bedda933e23768348d94e1d"},{url:"/assets/icons/setting/ic_collapse.svg",revision:"5672f0a013826d80c06133c564a73a5e"},{url:"/assets/icons/setting/ic_contrast.svg",revision:"0d8b9733214b05737113dbf128a8511d"},{url:"/assets/icons/setting/ic_contrast_bold.svg",revision:"da61600360bac834a1a92989f75ed7de"},{url:"/assets/icons/setting/ic_exit_full_screen.svg",revision:"246282fbcae8ee388f37ccdc6fd1f953"},{url:"/assets/icons/setting/ic_full_screen.svg",revision:"6f46ab708810690c3fb08de5e6142e97"},{url:"/assets/icons/setting/ic_moon.svg",revision:"e82028b062ff90a249186c5959877ba6"},{url:"/assets/icons/setting/ic_setting.svg",revision:"d381aa512f6850db5df1895d2e455579"},{url:"/assets/icons/setting/ic_sun.svg",revision:"8e96222e5a5d69bc190cb449fa3ae6b6"},{url:"/assets/illustrations/characters/character_1.png",revision:"bc4e5c299389bb14da1220b598b5da3e"},{url:"/assets/illustrations/characters/character_10.png",revision:"ede42615c08571c7c82e612c64325a5c"},{url:"/assets/illustrations/characters/character_11.png",revision:"71d5a84f9b9bb282657551f2f6db9147"},{url:"/assets/illustrations/characters/character_2.png",revision:"6b666ec9c6d3fa0a2f18b986993ec75f"},{url:"/assets/illustrations/characters/character_3.png",revision:"5cc1e2a795c838c50f75de3880d965c7"},{url:"/assets/illustrations/characters/character_4.png",revision:"336b96a16b0cbf10c4def69ade33d703"},{url:"/assets/illustrations/characters/character_5.png",revision:"3896b64faff1aa72e278227d779a34e5"},{url:"/assets/illustrations/characters/character_6.png",revision:"34ae2405ea6490edce36f9fbcdbf4b99"},{url:"/assets/illustrations/characters/character_7.png",revision:"2903866d442cf3498f63c5454dd70cc6"},{url:"/assets/illustrations/characters/character_8.png",revision:"67507c2b61e197b0c797df08f6a024f9"},{url:"/assets/illustrations/characters/character_9.png",revision:"802e8fd884a85958a3f006a53704d96d"},{url:"/assets/illustrations/illustration_dashboard.png",revision:"e5e83bd3d3d0c3c5846d159c4369fc60"},{url:"/assets/illustrations/illustration_docs.svg",revision:"1e992f33343b0254b1427ff33d0c84cf"},{url:"/assets/illustrations/illustration_empty_cart.svg",revision:"4989f529991253531548107c59d647fa"},{url:"/assets/illustrations/illustration_empty_content.svg",revision:"abacb8927c174d5979c39dc9dcb11e46"},{url:"/assets/illustrations/illustration_empty_mail.svg",revision:"a749853fdaed7a3ca2388ea673bd1ee1"},{url:"/assets/images/about/hero.jpg",revision:"f5c36a8459fba95ea4b8e1e5e63e1811"},{url:"/assets/images/about/testimonials.jpg",revision:"f359fad7659664f374896cb9e7cfa50b"},{url:"/assets/images/about/vision.jpg",revision:"581ddebdbe03e02c41574f9fe577d267"},{url:"/assets/images/about/what_1.jpg",revision:"9b48d72a2a5454ae25082489b33a4871"},{url:"/assets/images/about/what_2.jpg",revision:"33ce2299f386d307539b15e1ec049950"},{url:"/assets/images/contact/hero.jpg",revision:"39393f757b0e929d8c7b57b824a813b1"},{url:"/assets/images/faqs/hero.jpg",revision:"39dded64146e4ced9f13b09bef82a1f0"},{url:"/assets/images/home/clean_1.png",revision:"d8d050c656d0ca3dd7898eecaf7b7cff"},{url:"/assets/images/home/clean_10.png",revision:"470f3623befe3936d7a5e412775501e0"},{url:"/assets/images/home/clean_2.png",revision:"bd77f5c3edb37f2827bd90301a339471"},{url:"/assets/images/home/clean_3.png",revision:"24bfa799880dac311e598dd5ea13626f"},{url:"/assets/images/home/clean_4.png",revision:"4d371b53bae2de75d36658f4a9b2d30b"},{url:"/assets/images/home/clean_5.png",revision:"f797991f7570be6118b350ae8e9f9741"},{url:"/assets/images/home/clean_6.png",revision:"f914f60897fd3eeeed5cb1981fc48fe0"},{url:"/assets/images/home/clean_7.png",revision:"f44d57e72cb40d1fd59eefd1baa77b85"},{url:"/assets/images/home/clean_8.png",revision:"8e6fabb13973f2d46e70d3ea74fe8cff"},{url:"/assets/images/home/clean_9.png",revision:"fd9ba5c31fd117f6db7e347d5c376347"},{url:"/assets/images/home/darkmode.jpg",revision:"ab484f70a8c364ba5ec5d76c0521adf0"},{url:"/assets/images/home/for_designer.jpg",revision:"e30f95ab56a900578b10e46f6af5b7b0"},{url:"/assets/images/home/hero_dark_1.png",revision:"93c83108d6d18283e11eb605e6ae2ef3"},{url:"/assets/images/home/hero_dark_2.png",revision:"17148d38c1e8d1ea9b4587b6c7a05e70"},{url:"/assets/images/home/hero_light_1.png",revision:"f969a8fea3bbb5a2889c6e1c0aba8867"},{url:"/assets/images/home/hero_light_2.png",revision:"9dac86b103c8139435e712436751db41"},{url:"/assets/images/home/presets_block_blue.png",revision:"3c188c773fb61be59d40977741493667"},{url:"/assets/images/home/presets_block_cyan.png",revision:"c238fa769c1871e702f88d53062c2c0d"},{url:"/assets/images/home/presets_block_default.png",revision:"04356f32dd756873242d3571e64a5c7d"},{url:"/assets/images/home/presets_block_orange.png",revision:"8766966b44042d4894a3661e6e54831b"},{url:"/assets/images/home/presets_block_purple.png",revision:"d19391cffbeb323c77059932c3923769"},{url:"/assets/images/home/presets_block_red.png",revision:"f3f1c64ce8b7bdb08c1d441d67a06260"},{url:"/assets/images/home/presets_chart_blue.png",revision:"c6a4fd912f8352263395be30123fd6e4"},{url:"/assets/images/home/presets_chart_cyan.png",revision:"2e863e17f51db7542fcb00d3dbc54fbe"},{url:"/assets/images/home/presets_chart_default.png",revision:"1389dea8149365ecfedddc317f2464c3"},{url:"/assets/images/home/presets_chart_orange.png",revision:"aaa2f67e17751b02b2ed3bac6a47d169"},{url:"/assets/images/home/presets_chart_purple.png",revision:"5f463482a79fa53c60ac87344f72ef64"},{url:"/assets/images/home/presets_chart_red.png",revision:"0641695e0b0c272490c00312111f9ca5"},{url:"/assets/images/home/presets_grid.png",revision:"0dfdd3e0ef119a7f33207d801091a78e"},{url:"/assets/images/home/presets_screen_blue.png",revision:"199207c29ffd8dd3dd79cb354ba33e5a"},{url:"/assets/images/home/presets_screen_cyan.png",revision:"8772a78ba8ebfa5bddccd0269bbddb25"},{url:"/assets/images/home/presets_screen_default.png",revision:"29ed9573bc3bba47a45142d5a4bfc819"},{url:"/assets/images/home/presets_screen_orange.png",revision:"63529d182f76a3febcc8c16c5fb63211"},{url:"/assets/images/home/presets_screen_purple.png",revision:"2858ffdb78f719b0d3021c789a9ce382"},{url:"/assets/images/home/presets_screen_red.png",revision:"dc2bb98f8035ef75fd591b99a86e241f"},{url:"/assets/images/home/presets_sidebar_blue.png",revision:"cbb089c3b0ff1f2c5e7c288eb248d331"},{url:"/assets/images/home/presets_sidebar_cyan.png",revision:"6a65979dd130af34ca01c2f65c41a6da"},{url:"/assets/images/home/presets_sidebar_default.png",revision:"036e4c7d09c1eb833efa835b83366af6"},{url:"/assets/images/home/presets_sidebar_orange.png",revision:"7950db60cf678ddd1e3c30929e7a2788"},{url:"/assets/images/home/presets_sidebar_purple.png",revision:"c2155cfe833205d34c04f0051a74c744"},{url:"/assets/images/home/presets_sidebar_red.png",revision:"5f422d366410457699c5e3181547b9d8"},{url:"/assets/images/home/rocket.png",revision:"4b49974f221adec878bdf8411ad0c6ec"},{url:"/assets/images/home/zone_landing.png",revision:"47231f3b355e29ea95e1bdce77fce768"},{url:"/assets/images/logo.png",revision:"3a9df80e3223e4be2e3b2ce95839a681"},{url:"/assets/images/portraits/portrait_1.jpg",revision:"16e5f23b8b480995022b85da98cc5f93"},{url:"/assets/images/portraits/portrait_2.jpg",revision:"6eb9bbad34b04c7a3f24cbb5afe81ddb"},{url:"/assets/images/portraits/portrait_3.jpg",revision:"0a636ca989d829a8ef0bb46af21f507a"},{url:"/assets/images/portraits/portrait_4.jpg",revision:"bb863a98db30b1355a3943f85964d5d3"},{url:"/assets/images/portraits/portrait_5.jpg",revision:"892de7f62978624e3f5d458efd22deb8"},{url:"/assets/images/portraits/portrait_6.jpg",revision:"0737d78a8a60260ba8ae08adca0497be"},{url:"/assets/images/portraits/portrait_7.jpg",revision:"ee4ed1eb4490cd9282a0594657622d58"},{url:"/assets/images/portraits/portrait_8.jpg",revision:"07e7ccc102071e37915c97a69f229215"},{url:"/assets/images/rooms/room_1.jpg",revision:"a99bd9d98f9d60d01ccec664e9f776a7"},{url:"/assets/images/rooms/room_2.jpg",revision:"19ff084a880eb82a1d5e29c2dd79fc12"},{url:"/assets/images/rooms/room_3.jpg",revision:"0c098eaef1f267d7efb8c99d7e7cb091"},{url:"/assets/images/rooms/room_4.jpg",revision:"66dbbe85c54cd56af54ec9645e91aa88"},{url:"/assets/images/rooms/room_5.jpg",revision:"c22f4ccc397df2bb403c962adb90bcba"},{url:"/assets/placeholder.svg",revision:"9972b28ebbc6fb3e79235aa99cd6148a"},{url:"/assets/shape_avatar.svg",revision:"cbcb83705b33795e97b0b6e7d00a1aee"},{url:"/assets/transparent.png",revision:"f7d041b071d5496cbcf5c0ef79732c3e"},{url:"/favicon-16x16.png",revision:"c3340547739c605348ffc78327e2091c"},{url:"/favicon-32x32.png",revision:"653afb0fbd169a2badc663d828db3135"},{url:"/favicon.ico",revision:"621cc2fd45d5f293d54a1f8f850ef41f"},{url:"/fonts/CircularStd-Bold.otf",revision:"e7d8d6236925285b4445f933aebb68f3"},{url:"/fonts/CircularStd-Book.otf",revision:"4f84355b5c00ed31cdcf994158c0af39"},{url:"/fonts/CircularStd-Medium.otf",revision:"35be8fce7bdccf610b76528990f76136"},{url:"/fonts/Roboto-Bold.ttf",revision:"e07df86cef2e721115583d61d1fb68a6"},{url:"/fonts/Roboto-Regular.ttf",revision:"11eabca2251325cfc5589c9c6fb57b46"},{url:"/fonts/index.css",revision:"1811129be60b2d7cda351bb6a5e0c0a1"},{url:"/gifProcessando.jpeg",revision:"1d7626e6cbbdc02be15b16fa36add9ae"},{url:"/manifest.json",revision:"856b58870aed56f8c20f26c98cbce571"},{url:"/robots.txt",revision:"fa1ded1ed7c11438a9b0385b1e112850"},{url:"/sem-imagem.png",revision:"2ce20ce340278318c32636b9c1b5441e"},{url:"/site.webmanifest",revision:"053100cb84a50d2ae7f5492f7dd7f25e"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:s,response:e,event:a,state:i})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp4)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;const e=s.pathname;return!e.startsWith("/api/auth/")&&!!e.startsWith("/api/")}),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;return!s.pathname.startsWith("/api/")}),new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>!(self.origin===s.origin)),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
