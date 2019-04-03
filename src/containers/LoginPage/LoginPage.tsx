import * as React from 'react';
import { Link } from 'react-router-dom';

import UrlService from '../../services/Url.service';


export default function LoginPage() {
  return (
    <Link
      to={UrlService.parkings}
    >
      Login
    </Link>
  );
}
