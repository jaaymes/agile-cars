import React, { useEffect, useState } from "react";
import { IoShareOutline } from "react-icons/io5";
import { MdOutlineAddBox } from "react-icons/md"
import { toast } from 'react-toastify'

import { Image } from 'mui-image'

import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";

export const InstallPWA = () => {
  const delay = (ms: any) => new Promise(res => setTimeout(res, ms));
  const [isOpen, setIsOpen] = useState(false)

  const [promptInstall, setPromptInstall] = useState<any>(null);

  const [processando, setProcessando] = useState(false);

  const [appInstalado, setAppInstalado] = useState(false);

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  useEffect(() => {
    setProcessando(false);
  }, [appInstalado]);

  useEffect(() => {
    const check = localStorage.getItem("APP_INSTALLED");
    if (check) {
      setAppInstalado(true);
    }
    const handlerInstall = (e: any) => {
      e.preventDefault();
      localStorage.removeItem('APP_INSTALLED')
      setAppInstalado(false);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handlerInstall);


    //let deferredPrompt; // Allows to show the install prompt
    //let setupButton;
    window.addEventListener('appinstalled', async () => {
      localStorage.setItem('APP_INSTALLED', 'true')
      // Esconder a promoção de instalação fornecida pela app
      //hideInstallPromotion();
      // Limpar o deferredPrompt para que seja coletado
      //deferredPrompt = null;
      // Opcionalmente, enviar evento de analytics para indicar instalação com sucesso

      toast.success('Instalando app', { autoClose: 60000 });

      setProcessando(false);

      setAppInstalado(true);

    });

    return () => window.removeEventListener("transitionend", handlerInstall);
  }, []);

  const deviceCheck = () => {
    const isiOS = /iphone|ipad|ipod|macintosh/.test(
      window.navigator.userAgent.toLowerCase()
    );
    const isiPadOS =
      navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
    const isStandalone =
      // @ts-ignore
      "standalone" in window.navigator && window.navigator.standalone;

    return (isiOS || isiPadOS) && !isStandalone;
  };


  const onClick = (evt: any) => {
    evt.preventDefault();

    if (deviceCheck() === false) {
      if (!promptInstall) {
        //setProcessando(true);
        return;
      }

      promptInstall.prompt()
        .then(async function (choiceResult: { outcome: string; }) {

          if (choiceResult.outcome === 'accepted') {
            setProcessando(true);

            await delay(60000);

            setAppInstalado(true);

          } else {
            setProcessando(false);
          }
        });
    } else {
      openModal()
    }


  };

  // if (!supportsPWA) {
  //   return null;
  // }



  return (
    <Box sx={{ p: 8 }}>

      <Dialog
        open={isOpen}
        onClose={closeModal}
      >
        <DialogTitle>
          Instalação do Aplicativo
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h6">
              Passos
            </Typography>
            <Typography variant="body1">
              1 - Clique no botão &nbsp;
              <IoShareOutline />
            </Typography>
            <Typography variant="body1" sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              gap: 1
            }}>
              2 - Clique em Adicionar à tela inicial
              <MdOutlineAddBox />
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Fechar</Button>
        </DialogActions>
      </Dialog>

      <div>
        {!appInstalado && <div>
          <Button
            id="setup_button"
            aria-label="Instalar app"
            title="Instalar app"
            onClick={onClick}
          >
            Instalar Aplicativo
          </Button>
          <br />
          {/* <b>tempo de instalacao: 1 minuto </b> */}
        </div>
        }


        {
          processando && !appInstalado && <div >
            <Image src='./gifProcessando.jpeg' width="20px" height="20px" alt="logo" />
          </div>
        }

        {
          appInstalado && <div >
            <b>App instalado, feche o navegador e abra o app no seu dispositivo</b>
          </div>
        }
      </div>
    </Box>





  )
}

