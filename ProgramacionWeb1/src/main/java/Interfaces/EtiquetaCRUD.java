/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package Interfaces;

import Model.Etiqueta;
import java.util.List;

/**
 *
 * @author e-arduron
 */
public interface EtiquetaCRUD {

    public List getEtiquetas();

    public List getEtiquetasById(Etiqueta etiqueta);
}
