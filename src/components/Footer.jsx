function Footer({ name, styling }) {
    return (
      <footer className={styling} style={{ backgroundColor:"rgb(68, 168, 179)" }}>
        {name}
      </footer>
    );
  }
  export default Footer