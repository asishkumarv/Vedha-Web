import React, { useState } from 'react';

const ContactLocations = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const allLocations = [
    { city: "Hyderabad - Hitech City", phone: "+91 98765 43210", email: "hyd.hitech@vedhathrive.com", zone: "Telangana" },
    { city: "Hyderabad - Banjara Hills", phone: "+91 98765 43211", email: "hyd.bhills@vedhathrive.com", zone: "Telangana" },
    { city: "Bangalore - Indiranagar", phone: "+91 87654 32109", email: "blr.ind@vedhathrive.com", zone: "Karnataka" },
    { city: "Bangalore - Jayanagar", phone: "+91 87654 32108", email: "blr.jay@vedhathrive.com", zone: "Karnataka" },
    { city: "Vijayawada - MG Road", phone: "+91 76543 21098", email: "vja.mg@vedhathrive.com", zone: "Andhra Pradesh" },
    { city: "Visakhapatnam", phone: "+91 76543 21097", email: "vizag@vedhathrive.com", zone: "Andhra Pradesh" },
    { city: "Chennai - Adyar", phone: "+91 65432 10987", email: "chn.adyar@vedhathrive.com", zone: "Tamil Nadu" },
  ];

  const filteredLocations = allLocations.filter(loc =>
    loc.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loc.zone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="directory-section">
      <style>{`
        .directory-section {
          padding: 60px 20px;
          background-color: #fdfcf7;
          font-family: 'Inter', sans-serif;
          color: #2d332a;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .directory-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .directory-header h2 {
          font-family: 'Cinzel Decorative', serif;
          font-size: 2.8rem;
          margin-bottom: 10px;
        }

        .directory-header span { color: #d4a34d; }

        .search-wrapper {
          max-width: 500px;
          margin: 0 auto 40px;
        }

        .search-input {
          width:100%;
          padding: 14px 25px;
          border-radius: 50px;
          border: 1px solid #e5e7eb;
          font-size: 1rem;
          outline: none;
          transition: 0.3s;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }
          @media screen and (max-width:768px){
        .search-input {
            width:auto;
        }
          }

        .search-input:focus {
          border-color: #d4a34d;
        }

        .directory-table {
          width: 100%;
          background: #fff;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          border: 1px solid #f2f2eb;
        }

        .table-row {
          display: grid;
          /* Adjusted columns to fit City, Zone, Email, and Phone + Icon */
          grid-template-columns: 1.5fr 1fr 1.5fr 1.2fr 0.4fr; 
          padding: 18px 25px;
          border-bottom: 1px solid #f9f9f4;
          align-items: center;
        }

        .table-header {
          background: #2d332a;
          color: #d4a34d;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 1px;
        }

        .table-row:last-child { border-bottom: none; }
        .table-row:not(.table-header):hover { background: #fdfcf7; }

        .city-cell { font-weight: 600; color: #2d332a; }
        
        .zone-tag { 
          font-size: 0.75rem; 
          background: rgba(212, 163, 77, 0.1);
          color: #d4a34d;
          padding: 4px 12px; 
          border-radius: 50px; 
          width: fit-content;
        }

        .contact-link {
          text-decoration: none;
          color: #6b7280;
          font-size: 0.9rem;
          transition: 0.3s;
          word-break: break-all;
        }

        .contact-link:hover { color: #d4a34d; }

        .phone-text {
            font-weight: 500;
            color: #2d332a;
            font-size: 0.95rem;
        }

        .icon-call-btn {
          width: 38px;
          height: 38px;
          background: #d4a34d;
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: 0.3s;
        }

        .icon-call-btn:hover {
          background: #2d332a;
          transform: scale(1.1);
        }

        @media (max-width: 1024px) {
          .table-row { 
            grid-template-columns: 1.2fr 0.8fr 1.5fr 1.2fr 0.4fr; 
            font-size: 0.9rem;
            padding: 15px;
          }
        }

        @media (max-width: 768px) {
          .table-header { display: none; }
          .table-row { 
            grid-template-columns: 1fr; 
            gap: 12px; 
            padding: 25px;
            text-align: center;
          }
          .zone-tag, .icon-call-btn { margin: 0 auto; }
        }
      `}</style>

      <div className="container">
        <div className="directory-header">
          <h2>Our <span>Network</span></h2>
          <p>Tracing the Path of Disconnection through our Global Hubs.</p>
        </div>

        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search by city or region..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="directory-table">
          {/* HEADER ROW */}
          <div className="table-row table-header">
            <div>Center Location</div>
            <div>Region</div>
            <div>Official Email</div>
            <div>Phone Number</div>
            <div>Call</div>
          </div>

          {/* DATA ROWS */}
          {filteredLocations.length > 0 ? (
            filteredLocations.map((loc, index) => (
              <div className="table-row" key={index}>
                <div className="city-cell">{loc.city}</div>
                <div><span className="zone-tag">{loc.zone}</span></div>
                <div>
                  <a href={`mailto:${loc.email}`} className="contact-link">
                    {loc.email}
                  </a>
                </div>
                <div className="phone-text">{loc.phone}</div>
                <div>
                  <a href={`tel:${loc.phone.replace(/\s/g, '')}`} className="icon-call-btn" title="Call Now">
                    <i className="fa fa-phone"></i>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '50px', textAlign: 'center', color: '#999' }}>
              No locations found matching your search.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactLocations;