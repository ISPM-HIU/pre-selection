// import node module libraries
import { Menu } from 'react-feather';
import Link from 'next/link';
import {
	Nav,
	Navbar,
	Form,
	Image
} from 'react-bootstrap';

// import sub components
import QuickMenu from 'layouts/QuickMenu';

const NavbarTop = (props) => {
	return (
		<Navbar expanded="lg" style={{background: "transparent", boxShadow: "none"}} className="navbar-classic navbar navbar-expand-lg">
			<div className='d-flex justify-content-between w-100'>
				<div className="d-flex align-items-center">
					<Link
						href="#"
						id="nav-toggle"
						className="nav-icon me-2 icon-xs"
						onClick={() => props.data.SidebarToggleMenu(!props.data.showMenu)}>
						<Menu size="18px" />
					</Link>
					<div className="d-none d-md-none d-lg-block">
						<div className="d-flex justify-content-center" style={{borderRadius:'4em', width:'10em'}}>
							<Image src="/images/ispm.jpeg" style={{width:'35%',height:'20%'}} alt="" />
						</div>
						{/* Search Form */}
						{/* <Form className="d-flex align-items-center">
							<Form.Control type="search" placeholder="Recherche" />
						</Form> */}
					</div>
				</div>
				{/* Quick Menu */}
				<Nav className="navbar-right-wrap ms-2 d-flex nav-top-wrap">
				
					<QuickMenu />
				</Nav>
			</div>
		</Navbar>
	);
};

export default NavbarTop;
