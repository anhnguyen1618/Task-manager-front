import React from 'react';

const Loader = () => {
  return (
    <svg className="icon loading-spinner-sm" viewBox="0 0 36 36" width="36" height="36">
			<g>
				<path class="base" d="M18,31c-7.2,0-13-5.8-13-13S10.8,5,18,5s13,5.8,13,13S25.2,31,18,31z M18,8C12.5,8,8,12.5,8,18 s4.5,10,10,10s10-4.5,10-10S23.5,8,18,8z">
				</path>
			</g>
			<g>
				<path className="primary" d="M18,31c-7.2,0-13-5.8-13-13S10.8,5,18,5c0.8,0,1.5,0.7,1.5,1.5S18.8,8,18,8C12.5,8,8,12.5,8,18s4.5,10,10,10 c0.8,0,1.5,0.7,1.5,1.5S18.8,31,18,31z">
				</path>
			</g>
		</svg>
  )
}

export default Loader
