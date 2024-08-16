import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav className='container breadcrumb mx-auto px-10 py-3'>
      <ul className='flex space-x-2 list-none p-0'>
        <div>
          <Link to="/" className='text-gray-600 hover:text-gray-800'>Home</Link>
        </div>
        {pathnames.map((pathname, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          return (
            <React.Fragment key={to}>
              <div className='text-gray-600'>/</div>
              <div>
                <Link to={to} className='text-gray-600 hover:text-gray-800 capitalize'>
                  {pathname}
                </Link>
              </div>
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
