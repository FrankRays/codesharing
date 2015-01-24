              <section class="panel panel-default">
                <header class="panel-heading">
                  User 
                  <i class="fa fa-info-sign text-muted" data-toggle="tooltip" data-placement="bottom" data-title=""></i> 
                </header>
                <div class="table-responsive">
                  <table class="table table-striped m-b-none" id="data_user">
                    <thead>
                      <tr>
                        <th>NIM / NIP</th>
                        <th>Name</th>
                        <th>Kelas</th>
                        <th>Project</th>
                      </tr>
                    </thead>
                    <tbody>
                      <?php foreach ($user as $row): 
                        $kelas    = $this->Model->get('anggota', array('id_user' => $row->id_user)); 
                        $project  = count($this->Model->get('project',array('id_user' => $row->id_user)))?>
                        <tr>
                          <td><?php echo $row->id_user ?></td>
                          <td><?php echo $row->nama ?></td>
                          <td><?php echo $kelas = ($kelas) ? $this->Model->get('kelas', array('id_kelas' => $kelas[0]->id_kelas))[0]->nama_kelas : '' ; ?></td>
                          <td><?php echo $project ?></td>
                        </tr>
                      <?php endforeach ?>
                    </tbody>
                  </table>
                </div>
              </section>