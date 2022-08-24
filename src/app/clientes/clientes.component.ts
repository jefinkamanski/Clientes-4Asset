import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent implements OnInit {

  cliente = {} as Cliente;
  clientes: Cliente[] = [];

  
  constructor(private clienteService: ClientesService) { }

  
  ngOnInit() {
    this.getClientes();
    
  }

  getClientes() {
    this.clienteService.getClientes().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
      console.log(this.clientes)
    });
 
  }

}
