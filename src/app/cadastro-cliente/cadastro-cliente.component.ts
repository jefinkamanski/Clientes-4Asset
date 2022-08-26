import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Cliente } from '../models/cliente';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})

export class CadastroClienteComponent implements OnInit {

  formCliente: FormGroup;

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

  id_update = this.route.snapshot.paramMap.get('id');


  constructor(
    private clienteService: ClientesService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {

    this.formCliente = this.fb.group({
      id: ([0, Validators.required]),
      name: (['', Validators.required]),
      birth_at: ([null, Validators.required]),
      email: (['', [Validators.required, Validators.email]]),
      phone: (['', Validators.required])
    })

  }

  ngOnInit(): void {

    if (this.id_update) {
      this.getClienteId(this.id_update);
    };

  }

  get f() { return this.formCliente.controls; }

  getClienteId(id: any) {
    this.clienteService.getClienteById(id).pipe(first())
      .subscribe(
        x => this.formCliente.patchValue(x));
  }

  CriaCliente(): void {
    this.submitted = true;

    if (this.formCliente.invalid) {
      return;
    }

    this.clienteService.postCliente(this.formCliente.value)
      .subscribe({
        next: (res) => {
          console.log("Cliente cadastrado com sucesso!");
          setTimeout(() => { this.router.navigateByUrl('/clientes') }, 3000);
        },
        error: (e) => console.error(e)
      });
  }

  salvarCliente() {
    if (!this.id_update) {
      this.CriaCliente();
    } else {
      this.putClienteId();
    }
  }

  putClienteId() {
    this.submitted = true;
    if (this.formCliente.invalid) {
      return;
    }

    this.clienteService.putCliente(this.cliente.id, this.formCliente.value).subscribe(res => {
      console.log('Cliente Atualizado com sucesso!');
      setTimeout(() => { this.router.navigateByUrl('/clientes') }, 3000);

    })
  }

  voltar() {
    this.router.navigate(['/clientes']);
  }

}

