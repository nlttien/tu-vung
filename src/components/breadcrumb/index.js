import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Breadcrumb component to display the current page's breadcrumb navigation.
 * 
 * This component generates breadcrumb links based on the current URL path,
 * allowing users to navigate back to previous sections.
 */
const Breadcrumb = () => {
  // Get the current location from the React Router
  const location = useLocation();

  // Split the pathname into individual path segments and filter out empty values
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav className='container breadcrumb mx-auto px-10 py-3'>
      {/* Breadcrumb list container */}
      {/* Uses flexbox to align breadcrumb items horizontally with spacing between them */}
      <ul className='flex space-x-2 list-none p-0'>
        {/* Home link */}
        {/* Always display the 'Home' link as the first item */}
        <div>
          <Link to="/" className='text-gray-600 hover:text-gray-800'>Home</Link>
        </div>

        {/* Map through pathnames to generate breadcrumb links */}
        {pathnames.map((pathname, index) => {
          // Construct the URL for the current breadcrumb link
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          return (
            <React.Fragment key={to}>
              {/* Separator between breadcrumb items */}
              <div className='text-gray-600'>/</div>
              {/* Breadcrumb link */}
              {/* Display the breadcrumb item with a link to the constructed URL */}
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
