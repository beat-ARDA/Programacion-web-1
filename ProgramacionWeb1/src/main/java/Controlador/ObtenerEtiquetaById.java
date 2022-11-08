/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controlador;

import DAO.EtiquetaDAO;
import Model.Etiqueta;
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
@WebServlet(name = "ObtenerEtiquetaById", urlPatterns = {"/ObtenerEtiquetaById"})
public class ObtenerEtiquetaById extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        List<Etiqueta> listaEtiquetas = new ArrayList<Etiqueta>();
        HashMap resultado = new HashMap();
        EtiquetaDAO etiquetaDao = new EtiquetaDAO();
        int id = Integer.parseInt(request.getParameter("id"));
        Etiqueta etiqueta = new Etiqueta(id);
        listaEtiquetas = etiquetaDao.getEtiquetasById(etiqueta);

        if (listaEtiquetas != null) {
            resultado.put("resultado", listaEtiquetas);
        } else {
            resultado.put("resultado", false);
        }

        String json = new Gson().toJson(resultado);

        PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();
    }
}
