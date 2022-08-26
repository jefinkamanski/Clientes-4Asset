import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { timeout } from 'rxjs';
import { Cliente } from '../models/cliente';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})

export class CadastroClienteComponent implements OnInit {



  cliente: Cliente = {
    id: 0,
    name: '',
    birth_at: new Date,
    email: '',
    phone: 0,
    created_at: new Date,
    updated_at: new Date
  };

  submitted = false;
  id_update= this.route.snapshot.paramMap.get('id');

  constructor(
    private clienteService: ClientesService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }
  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) { 
      this.getClienteId(this.id_update);
    }

  }

  CriaCliente(): void {
    const data = {
      id: 0,
      name: this.cliente.name,
      birth_at: this.cliente.birth_at,
      email: this.cliente.email,
      phone: this.cliente.phone,
      created_at: new Date(),
      updated_at: new Date()
    };

    this.clienteService.postCliente(data)
      .subscribe({
        next: (res) => {
          console.log("Cliente cadastrado com sucesso!");
          this.submitted = true;
          setTimeout(() => { this.novoCliente(); }, 3000)
          this.router.navigateByUrl('clientes');
        },
        error: (e) => console.error(e)
      });
  }

  novoCliente() {
    this.submitted = false;
    this.cliente = {
      id: 0,
      name: '',
      birth_at: new Date,
      email: '',
      phone: 0,
      created_at: new Date,
      updated_at: new Date
    } as Cliente
  }

  savarCliente() {
    if(!this.id_update){
      this.CriaCliente();
    }else{
      this.putClienteId();
    }
  }

  getClienteId(id: any) {
    this.clienteService.getClienteById(id)
    .subscribe(
      cliente => { 
        this.cliente = cliente;
        console.log(cliente);
      },
      error => {
        console.log(error);
  });
  }

  putClienteId(){
    this.clienteService.putCliente(this.cliente.id, this.cliente).subscribe(res => {
      console.log('Cliente Atualizado com sucesso!');
      this.submitted = true;
      setTimeout(() => { this.novoCliente(); }, 3000);
      this.router.navigateByUrl('/clientes');
    })
  }

  voltar() {
    this.router.navigate(['/clientes']);
}

}

