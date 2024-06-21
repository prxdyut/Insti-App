import React, {
  Ref,
  createElement,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Navbar,
  Page,
  PhotoBrowser,
  Block,
  Button,
  f7,
} from "framework7-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { imagesPopupListener } from "../events/imagesPopup";

type Props = {
  images: ImageObject[];
};

export default function Images(props: Props) {
  const popup = useRef<any>(null);
  const photos = props.images;
  const thumbs = photos.map((photo: any) => {
    if (typeof photo === "string") return photo;
    else return photo?.url;
  });

  const [photoBrowserId] = useState(Math.round(Math.random() * 100));
  const modalName = "photo-browser-" + photoBrowserId;
  const [searchParams, setSearchParams] = useSearchParams();
  const opened = popup.current?.f7PhotoBrowser?.().opened;

  const open = () => {
    if (popup.current) popup.current.open();
  };

  const close = () => {
    if (popup.current) {
      popup.current.close();
    }
  };

  function onOpened() {
    setSearchParams({ [modalName]: "true" });
  }

  function onClosed() {
    searchParams.delete(modalName);
    setSearchParams(searchParams, { replace: true });
  }

  useEffect(() => {
    if (searchParams.get(modalName)) {
      if (!opened) {
        open();
      }
    } else {
      if (opened) {
        close();
      }
    }
  }, [searchParams, opened]);

  imagesPopupListener(open);

  return (
    <React.Fragment key={photos.length}>
      <PhotoBrowser
        photos={photos}
        thumbs={thumbs}
        theme="dark"
        type="popup"
        onPhotoBrowserClosed={onClosed}
        onPhotoBrowserOpened={onOpened}
        ref={popup}
      />
    </React.Fragment>
  );
}
