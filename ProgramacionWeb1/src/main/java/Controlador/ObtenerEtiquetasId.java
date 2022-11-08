/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controlador;

import DAO.EtiquetaPublicacionDAO;
import Model.EtiquetaPublicacion;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author e-arduron
 */
@WebServlet(name = "ObtenerEtiquetasId", urlPatterns = {"/ObtenerEtiquetasId"})
public class ObtenerEtiquetasId extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        List<EtiquetaPublicacion> listaEtiquetaPublicacion = new ArrayList<>();
        HashMap resultado = new HashMap();
        EtiquetaPublicacionDAO EtiquetaPublicacionDao = new EtiquetaPublicacionDAO();

        int idPubli = Integer.parseInt(request.getParameter("idPubli"));

        EtiquetaPublicacion etiquetaPublicacion = new EtiquetaPublicacion(idPubli);

        listaEtiquetaPublicacion = EtiquetaPublicacionDao.selectEtiquetasId(etiquetaPublicacion);

        if (listaEtiquetaPublicacion != null) {
            resultado.put("resultado", listaEtiquetaPublicacion);
        } else {
            resultado.put("resultado", false);
        }

        String json = new Gson().toJson(resultado);

        PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();
    }
}
