import Layout from "../Components/Layout";
import Button from "@mui/material/Button";
import InputColor from "react-input-color";

import { useRef, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import Grid from "@mui/material/Grid";
import prestyles from "../styles/Invoice.module.css";

import Nonssrwraper from "../Components/nonssrwraper";

import {
  Document,
  Font,
  Page,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { green } from "@mui/material/colors";
import {
  Box,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { SelectChangeEvent } from "@mui/material/Select";
import { Label } from "@mui/icons-material";
import { maxHeight } from "@mui/system";
import ReactToPrint from "react-to-print";
// import JoditEditor from "jodit-react";
import dynamic from "next/dynamic";

const Invoicer = () => {
  const [autorFsize, setAutorFsize] = useState(14);
  const [textAlign, setTextAlign] = useState("center");
  const [logopaddingTop, setlogoPaddingTop] = useState(12);
  const [age, setAge] = useState("");
  const [headerBGcolor, setColor] = useState({});

  const importJodit = () => import("jodit-react");

  const JoditEditor = dynamic(importJodit, {
    ssr: false,
  });

  //aqui establecemos las reglas css de la factura
  const styles = StyleSheet.create({
    logo: {
      paddingTop: "15px",
      paddingBottom: "15px",
      paddingHorizontal: "15px",
      width: "200px",
    },
    body: {
      paddingTop: "35px",
      paddingBottom: "65px",
      paddingHorizontal: "35px",
    },
    title: {
      fontSize: "24px",
      textAlign: "center",
      fontFamily: "Oswald",
    },
    author: {
      fontSize: "" + autorFsize + "px",
      textAlign: textAlign,
      paddingBottom: "10px",
      width: "auto",
      maxHeight: "200px",
    },
    subtitle: {
      fontSize: 18,
      margin: "12px",
      fontFamily: "Oswald",
    },
    text: {
      margin: "12px",
      fontSize: "14px",
      textAlign: "justify",
      fontFamily: "Times-Roman",
    },
    image: {
      marginVertical: "15px",
      marginHorizontal: "100px",
    },
    header: {
      marginBottom: "20px",
      backgroundColor: headerBGcolor.rgba,
      margin: "-40px -40px 20px",
      padding: "40px",
      backgroundImage: `url(https://img.freepik.com/free-vector/modern-flowing-blue-wave-banner-white-background_1035-18960.jpg?w=1380&t=st=1660654567~exp=1660655167~hmac=37b70de5f997e80469e8dedf46f93fc5dcb11347073822db1e62c703dd5a365e)`,
      backgroundRepeat: "no-repeat",
      maxHeight: "200px",
    },

    pageNumber: {
      position: "absolute",
      fontSize: "12px",
      bottom: "30px",
      left: "0px",
      right: "0px",
      textAlign: "center",
      color: "grey",
    },
  });
  //fin de las reglas css

  Font.register({
    family: "Oswald",
    src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
  });

  const Subtitle = ({ children, ...props }) => (
    <Text style={styles.subtitle} {...props}>
      {children}
    </Text>
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  function changeautor(event) {
    setAutorFsize(watch("autorFsize"));
    setCompanyData(watch("companyData"));
    setContent(watch("companyData"));
  }

  const autorTextAlign = (event) => {
    console.log(event.target.value);
    setTextAlign(event.target.value);
  };
  var classHoja =
    prestyles.padding10 + " " + prestyles.sheet + " " + prestyles.A4;
  var bodyHoja = prestyles.bodyA4 + " " + prestyles.bodysheet;
  const [companyData, setCompanyData] = useState("");
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const [toggle, setToggle] = useState(prestyles.circlescaledown);
  const [toggleState, setToggleState] = useState(false);
  const toggleItem = () => {
    setToggleState(!toggleState);
    if (toggleState == false) {
      setToggle(prestyles.circlescaledown);
    } else {
      setToggle(prestyles.circlescaleup);
    }
  };
  var circleClass = prestyles.circlebutton + " " + toggle;
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    autoFocus: true,
  };

  const editorF = useRef(null);
  const [contentF, setContentF] = useState("");

  const configF = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    autoFocus: true,
  };
  const [boxHVisibility, setBoxHVisibility] = useState(false);
  const [boxFVisibility, setBoxFVisibility] = useState(false);

  const showHeaderbox = () => {
    setBoxHVisibility(!boxHVisibility);
  };
  const showFooterbox = () => {
    setBoxFVisibility(!boxFVisibility);
  };
  const componentRef = useRef(null);
  return (
    <Nonssrwraper>
      <div className="wrapper" style={{ flex: "20px" }}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <form onChange={changeautor}>
            {/*  */}
            <h2
              className={prestyles.headeroptions}
              onClick={() => showHeaderbox()}
            >
              Header
            </h2>
            {boxHVisibility && (
              <div className={prestyles.showHeaderbox}>
                <JoditEditor
                  ref={editor}
                  value={content}
                  config={config}
                  autoFocus
                  tabIndex={1} // tabIndex of textarea
                  onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                />
                <Button>Renderizar Header</Button>
              </div>
            )}

            <h2
              className={prestyles.headeroptions}
              onClick={() => showFooterbox()}
            >
              Footer
            </h2>
            {boxFVisibility && (
              <div className={prestyles.showFooterbox}>
                <JoditEditor
                  ref={editorF}
                  value={contentF}
                  config={configF}
                  autoFocus
                  tabIndex={1} // tabIndex of textarea
                  onBlur={(newContentF) => setContentF(newContentF)} // preferred to use only this option to update the content for performance reasons
                />
                <Button>Renderizar Footer</Button>
              </div>
            )}
          </form>
        </Box>
        <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return <a href="#">Print this out!</a>;
          }}
          content={() => componentRef}
        />
        <Grid className={bodyHoja}>
          <Box className={classHoja} ref={(el) => (componentRef = el)}>
            <section style={styles.header}>
              <Grid container>
                <Grid xs={4}>
                  <img
                    style={styles.logo}
                    src="http://static.donquijote.org/images/blogs/dq-reg/don-quijote-de-la-mancha.jpg"
                  />
                </Grid>
                <Grid xs={8}>
                  <div
                    style={styles.author}
                    className={prestyles.parrafo}
                    xs={8}
                    dangerouslySetInnerHTML={{ __html: content }}
                  >
                    {/* {companyData} */}
                    {/* {content} */}
                  </div>
                </Grid>
              </Grid>
            </section>
            <section>
              {/* colocamos aca los productos */}
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                      <StyledTableCell align="right">Calories</StyledTableCell>
                      <StyledTableCell align="right">
                        Fat&nbsp;(g)
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        Carbs&nbsp;(g)
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        Protein&nbsp;(g)
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.calories}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.fat}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.carbs}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.protein}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <footer className={prestyles.footer}>
                <div dangerouslySetInnerHTML={{ __html: contentF }}></div>
              </footer>
            </section>
            <section></section>
          </Box>
        </Grid>

        {/* <PDFViewer style={{ flex: 10, width: 400, height: 600 }}>
          <Document>
            <Page style={styles.body} wrap>
              <div style={styles.header} fixed>
                <Image
                  style={styles.logo}
                  src="http://static.donquijote.org/images/blogs/dq-reg/don-quijote-de-la-mancha.jpg"
                />
                <Text>~ Created with react-pdf ~</Text>
              </div>

              <Text style={styles.title}>Don Quijote de la Mancha</Text>
              <Text style={styles.author}>Miguel de Cervantes</Text>

              <Subtitle>
                Capítulo I: Que trata de la condición y ejercicio del famoso
                hidalgo D. Quijote de la Mancha
              </Subtitle>

              <Text
                style={styles.pageNumber}
                render={({ pageNumber, totalPages }) =>
                  `${pageNumber} / ${totalPages}`
                }
                fixed
              />
            </Page>
          </Document>
        </PDFViewer> */}
      </div>
    </Nonssrwraper>
  );
};
export default Invoicer;
